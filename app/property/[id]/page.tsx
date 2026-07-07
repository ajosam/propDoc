import { PROPERTIES } from "@/lib/data/properties";
import { buildWorkspaceProps } from "@/lib/build-workspace-props";
import { WorkspaceView } from "@/components/workspace/workspace-view";
import { ClientOnlyWorkspace } from "@/components/workspace/client-only-workspace";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ id: p.id }));
}

export default async function PropertyWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = PROPERTIES.find((p) => p.id === id);

  if (!property) {
    return <ClientOnlyWorkspace propertyId={id} />;
  }

  return <WorkspaceView {...buildWorkspaceProps(property)} />;
}
