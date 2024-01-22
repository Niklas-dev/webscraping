import DashboardNavBar from "@/components/DashboardNavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-screen  flex flex-row">
      <DashboardNavBar />
      {children}
    </section>
  );
}
