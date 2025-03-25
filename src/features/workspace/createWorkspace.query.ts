import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type CreateWorkspaceQueryProps = {
  data: Prisma.WorkspaceUncheckedCreateInput;
};

export const CreateWorkspaceQuery = async ({
  data,
}: CreateWorkspaceQueryProps) =>
  prisma.workspace.create({
    data: {
      ...data,
    },
  });

export type CreateWorkspaceQuery = Prisma.PromiseReturnType<
  typeof CreateWorkspaceQuery
>;
