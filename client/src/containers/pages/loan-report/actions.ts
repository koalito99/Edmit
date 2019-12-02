import { ActionsUnion } from '../../../lib/redux';
import ModalControllerActions from '../../organisms/modal-controller/actions'

const actions = {
  showUploadAidLetterModal: (
    college: {
      id: string;
      name: string;
      edstimate: number;
    } | null
  ) => ModalControllerActions.showUploadAidLetterModal(college)
};

export type Actions = ActionsUnion<typeof actions>;
export default actions;
