import { AdminLayout } from "@/components/admin/admin-layout"
import { UserGroupsManagement } from "@/components/admin/user-groups-management"

export default function UserGroupsPage() {
  return (
    <AdminLayout>
      <UserGroupsManagement />
    </AdminLayout>
  )
}
