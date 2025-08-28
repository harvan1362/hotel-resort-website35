"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { GroupContentManagement } from "@/components/admin/group-content-management"

interface PageProps {
  params: {
    groupId: string
  }
}

export default function GroupContentPage({ params }: PageProps) {
  return (
    <AdminLayout>
      <GroupContentManagement groupId={params.groupId} />
    </AdminLayout>
  )
}
