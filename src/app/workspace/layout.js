import { Provider } from "@/context/Provider";
import SidebarComponent from "./_component/sidebarComponent";
import HeaderComponent from "./_component/headerComponent";
import FooterComponent from "./_component/footerComponent";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
        <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {/* Header */}
        <HeaderComponent />

        {children}
      </div>
    </div>
             
         </Provider>
      </body>
    </html>
  );
}
