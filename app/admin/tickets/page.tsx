import { AdminLayout } from "@/components/admin/admin-layout"
import { TicketsManagement } from "@/components/admin/tickets-management"

export default function TicketsPage() {
  return (
    <AdminLayout>
      <TicketsManagement />
    </AdminLayout>
  )
}
