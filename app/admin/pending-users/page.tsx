import { AdminLayout } from "@/components/admin/admin-layout"
import { PendingUsersManagement } from "@/components/admin/pending-users-management"

export default function PendingUsersPage() {
  return (
    <AdminLayout>
      <PendingUsersManagement />
    </AdminLayout>
  )
}
