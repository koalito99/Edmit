import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { doNothingFn, IEdmitPlusStatusProps, IProduct } from '@edmit/component-library/src/shared'
import {
  EAtomicBoolean,
  Nullable,
  ProductId,
  StripeToken,
  StudentId,
  useAtomicBoolean, useNullableState
} from '@edmit/component-library/src/lib/models';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { GET_APPLIED_PRODUCTS_FOR_STUDENT, GET_PRODUCTS } from '../../graphql/queries';
import { useStudentSwitcher } from '../student-switcher';
import {
  BillingPeriod,
  GetAppliedProductsForStudent,
  GetAppliedProductsForStudent_student_appliedProducts,
  GetAppliedProductsForStudentVariables,
  GetProducts,
  PurchaseProduct,
  PurchaseProductVariables,
  ApplyProduct,
  ApplyProductVariables
} from '../../graphql/generated';
import { PURCHASE_PRODUCT, APPLY_PRODUCT } from '../../graphql/mutations';
import { studentQueryProperties } from '../../lib/graphql'

type PlanSelectionModalOpenFn = (reason: string) => void;
type PlanSelectionModalCloseFn = () => void;

interface IPurchaseProductParams {
  stripeToken: StripeToken;
  productId: ProductId;
  coupon: string | null;
}

type PurchaseProductFn = (product: ProductId, stripeToken: StripeToken, coupon: Nullable<string>) => Promise<void>;

type ApplyProductFn = (params: { token: string }) => Promise<void>;

export interface IPlanSelectionModalProps {
  freeProductId: ProductId;
  appliedProductIds: ProductId[];
  products: IProduct[];
  planSelectionModalOpen: boolean;
  planSelectionReason: string;
  openPlanSelectionModal: PlanSelectionModalOpenFn;
  closePlanSelectionModal: PlanSelectionModalCloseFn;
  purchaseProduct: PurchaseProductFn;
  applyProduct: ApplyProductFn;
  selectedProductId: Nullable<string>;
  setSelectedProductId: (v: Nullable<string>) => void;
  hasEdmitPlusLoading: boolean;
}

export type PaywallContext = IPlanSelectionModalProps & IEdmitPlusStatusProps;

const useAppliedProductsForStudent = (studentId: Nullable<StudentId>) => {
  const { data, loading, refetch } = useQuery<
    GetAppliedProductsForStudent,
    GetAppliedProductsForStudentVariables
  >(GET_APPLIED_PRODUCTS_FOR_STUDENT, studentQueryProperties(studentId)({}));

  return { data, loading, refetch };
};

const appliedProductsContainsEdmitPlus = (
  appliedProducts: GetAppliedProductsForStudent_student_appliedProducts[]
) => {
  return appliedProducts.length > 0;
};

const usePurchaseProductMutation = () => {
  const { studentId } = useStudentSwitcher();

  const mutation = useMutation<PurchaseProduct, PurchaseProductVariables>(PURCHASE_PRODUCT);

  const purchaseProduct = async (params: IPurchaseProductParams) => {
    if (!studentId) throw Error('unexpected - student id not provided');

    return mutation(studentQueryProperties(studentId)(params));
  };

  return {
    purchaseProduct
  };
};

interface IApplyProductParams {
  token: string;
}

const useApplyProductMutation = () => {
  const mutation = useMutation<ApplyProduct, ApplyProductVariables>(APPLY_PRODUCT);

  const applyProduct = async (params: IApplyProductParams) => {
    return mutation({ variables: { token: params.token } })
  }

  return {
    applyProduct
  }
}

const useProducts = () => {
  const { data, loading, refetch } = useQuery<GetProducts>(GET_PRODUCTS);

  return { data, loading, refetch };
};

export const FREE = 'FREE';

const usePaywallContext = (studentId: Nullable<StudentId>): PaywallContext => {
  const { purchaseProduct } = usePurchaseProductMutation();
  const { data: productsData, loading: productsLoading } = useProducts();
  const { applyProduct } = useApplyProductMutation()
  const { data: appliedProducts, loading: appliedProductsLoading } = useAppliedProductsForStudent(
    studentId
  );
  const [organizationLogoUrl, setOrganizationLogoUrl] = useNullableState<string>()
  const [appliedProductIds, setAppliedProductIds] = useState<ProductId[]>([]);
  const [planSelectionModalOpen, setPlanSelectionModalOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [planSelectionReason, setPlanSelectionReason] = useState('');
  const [selectedProductId, setSelectedProductId] = useNullableState<string>()

  const { value: hasEdmitPlus, set: setHasEdmitPlus } = useAtomicBoolean();

  const openPlanSelectionModal = (reason: string = '') => {
    setPlanSelectionModalOpen(true);
    setPlanSelectionReason(reason);
  };
  const closePlanSelectionModal = () => setPlanSelectionModalOpen(false);

  useEffect(() => {
    if (!productsLoading && productsData && productsData.products) {
      setProducts([
        {
          id: FREE,
          name: 'Edmit Free',
          description: '',
          version: '',
          amount: 0,
          period: BillingPeriod.Monthly,
          organization: null
        },
        ...productsData.products
      ]);
    }
  }, [productsData, studentId]);

  useEffect(() => {
    if (
      !appliedProductsLoading &&
      !productsLoading &&
      appliedProducts &&
      appliedProducts.student &&
      appliedProducts.student.appliedProducts
    ) {
      setAppliedProductIds(appliedProducts.student.appliedProducts.map(p => p.id));
      setHasEdmitPlus(appliedProductsContainsEdmitPlus(appliedProducts.student.appliedProducts));
      setOrganizationLogoUrl(
        appliedProducts &&
        appliedProducts.student &&
        appliedProducts.student.appliedProducts[0] &&
        appliedProducts.student.appliedProducts[0].product.organization &&
        appliedProducts.student.appliedProducts[0].product.organization.logoUrl
      )
    }
  }, [studentId, appliedProducts]);

  useEffect(() => {
    if (!planSelectionModalOpen) {
      setPlanSelectionReason('');
    }
  }, [planSelectionModalOpen]);

  return {
    purchaseProduct: (productId: ProductId, stripeToken: StripeToken, coupon: Nullable<string>) =>
      purchaseProduct({ stripeToken, productId, coupon: coupon || null }),
    freeProductId: FREE,
    appliedProductIds,
    hasEdmitPlus: hasEdmitPlus === EAtomicBoolean.True,
    organizationLogoUrl,
    planSelectionModalOpen,
    openPlanSelectionModal,
    closePlanSelectionModal,
    products,
    planSelectionReason,
    selectedProductId,
    setSelectedProductId,
    hasEdmitPlusLoading: appliedProductsLoading,
    applyProduct
  };
};

const defaultPaywallContext: PaywallContext = {
  purchaseProduct: (productId: ProductId, stripeToken: StripeToken) => Promise.resolve(),
  freeProductId: FREE,
  organizationLogoUrl: null,
  hasEdmitPlus: false,
  openPlanSelectionModal: doNothingFn,
  planSelectionReason: '',
  planSelectionModalOpen: false,
  products: [],
  appliedProductIds: [],
  closePlanSelectionModal: doNothingFn,
  setSelectedProductId: doNothingFn,
  selectedProductId: null,
  hasEdmitPlusLoading: true,
  applyProduct: () => Promise.resolve()
};

const PaywallContext = createContext<PaywallContext>(defaultPaywallContext);

export const PaywallProvider: React.SFC = props => {
  const { studentId } = useStudentSwitcher();

  const paywall = usePaywallContext(studentId);

  return (
    <PaywallContext.Provider value={paywall}>
      <>{props.children}</>
    </PaywallContext.Provider>
  );
};

export const usePaywall = () => useContext(PaywallContext);
