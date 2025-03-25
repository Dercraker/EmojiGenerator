import { prisma } from "@lib/prisma";
import type { Prisma } from "@prisma/client";

type GetWorkspacesQueryProps = {
  where?: Prisma.WorkspaceWhereInput;
  select?: Prisma.WorkspaceSelect;
};

export const GetWorkspacesQuery = async ({
  where,
  select,
}: GetWorkspacesQueryProps) => {
  const workspaces = await prisma.workspace.findMany({
    where: where ? { ...where } : undefined,
    select: select ? { ...select } : undefined,
  });

  return workspaces;
};

export type GetWorkspacesQuery = Prisma.PromiseReturnType<
  typeof GetWorkspacesQuery
>;
