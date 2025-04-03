import "./globals.css"
import { Provider } from "@/context/Provider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
	          {children}
         </Provider>
      </body>
    </html>
  );
}