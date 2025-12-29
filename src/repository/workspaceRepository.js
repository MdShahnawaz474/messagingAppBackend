import { StatusCodes } from 'http-status-codes';

import WorkSpace from '../schema/WorkSpace.js';
import ClientError from '../utils/errors/clientError.js';
import crudRepository from './crudRepository.js';

const WorkspaceRepository = {
  ...crudRepository(WorkSpace),
  getWorkspaceByName: async function (workspaceName) {
    const workSpace = await WorkSpace.findOne({ name: workspaceName });

    if (!workSpace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return workSpace;
  },
  getWorkspaceByJoinCode: async function (joinCode) {
    const workspace = await WorkSpace.findOne({ joinCode });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return workspace;
  },
  addMemberToWorkspace: async function (
    memberId,
    workspaceId,
    role = 'member',
  ) {
    const workSpace = await WorkSpace.findById(workspaceId);
    if (!workSpace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const isAlreadyMember = workSpace.members.find(
      (member) => (member.memberId = memberId),
    );
    if (isAlreadyMember) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User is already a member of the workspace',
        statusCode: StatusCodes.FORBIDDEN,
      });
    }
    workSpace.members.push({ memberId, role });
    await workSpace.save();
    return workSpace;
  },
  addChannelToWorkspace: async function () {},
  fetchAllWorkspaceByMemberId: async function (memberId) {},
};

export default WorkspaceRepository;
