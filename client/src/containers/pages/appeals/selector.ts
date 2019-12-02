import { IState } from '../../../store/rootReducer';
import { IContainedAppealsPageViewModel } from '.';
import {modalControllerState} from "../../organisms/modal-controller/selector";

export const appealsPageViewModel = (state: IState): IContainedAppealsPageViewModel => ({
  upgradeModalOpen: modalControllerState(state).purchaseModal !== null
});
