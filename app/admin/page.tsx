import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminOverview } from "@/components/admin/admin-overview"

import "@/scripts/seed-group-content"

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminOverview />
    </AdminLayout>
  )
}
