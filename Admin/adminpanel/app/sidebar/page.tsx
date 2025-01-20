import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  ClipboardList,
  Tags,
  Settings,
  BarChart3,
  Truck,
  MessageSquare,
  AlertCircle,
  Wallet,
  UserRoundCheck,
  LogOut,
  Airplay,
} from "lucide-react";
import Link from "next/link";

// User profile data
const userProfile = {
  name: "Admin User",
  email: "admin@store.com",
  avatarUrl: <UserRoundCheck color="#1303fc" size={40} />,
};

// E-commerce specific navigation items
const navItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <ShoppingCart className="w-5 h-5 mr-3" />,
    link: "/orders",
  },
  {
    id: 3,
    title: "Products",
    icon: <Package className="w-5 h-5 mr-3" />,
    link: "/products",
  },
  {
    id: 4,
    title: "Categories",
    icon: <Tags className="w-5 h-5 mr-3" />,
    link: "/category",
  },
  {
    id: 5,
    title: "Customers",
    icon: <Users className="w-5 h-5 mr-3" />,
    link: "/customers",
  },
  {
    id: 6,
    title: "Banners",
    icon: <Airplay  className="w-5 h-5 mr-3" />,
    link: "/banner",
  },
  //   {
  //     id: 6,
  //     title: "Inventory",
  //     icon: <ClipboardList className="w-5 h-5 mr-3" />
  //   },
  //   {
  //     id: 7,
  //     title: "Analytics",
  //     icon: <BarChart3 className="w-5 h-5 mr-3" />
  //   },
  //   {
  //     id: 8,
  //     title: "Shipping",
  //     icon: <Truck className="w-5 h-5 mr-3" />
  //   },
  //   {
  //     id: 9,
  //     title: "Reviews",
  //     icon: <MessageSquare className="w-5 h-5 mr-3" />
  //   },
  //   {
  //     id: 10,
  //     title: "Transactions",
  //     icon: <Wallet className="w-5 h-5 mr-3" />
  //   },
  //   {
  //     id: 11,
  //     title: "Reports",
  //     icon: <AlertCircle className="w-5 h-5 mr-3" />
  //   },
  //   {
  //     id: 12,
  //     title: "Settings",
  //     icon: <Settings className="w-5 h-5 mr-3" />
  //   }
];

const Nav = () => {
  return (
    <div className="  h-screen min-w-[260px] max-w-[260px] bg-gray-800 top-0 left-0 py-6 px-4 font-sans overflow-auto">
      {/* Store Logo & Brand */}
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-xl font-bold text-white">E-Store Admin</h1>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center gap-4 px-4 py-4 bg-gray-800 rounded-lg mb-6">
        {userProfile.avatarUrl}
        {/* <img 
          src={userProfile.avatarUrl} 
          alt={userProfile.name}
          className="w-10 h-10 rounded-full border-2 border-gray-700" 
        /> */}
        <div>
          <p className="text-sm font-medium text-white">{userProfile.name}</p>
          <p className="text-xs text-gray-400">{userProfile.email}</p>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="space-y-1 flex flex-col">
        {navItems.map((item) => (
          //   <a
          //     key={item.id}
          //     href={item.link}
          //     className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200"
          //   >
          <Link
            key={item.id}
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200"
            href={item.link}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
          //   </a>
        ))}
      </div>
      <p className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200">
        <LogOut /> <span className="text-sm px-3 font-medium">Logout</span>
      </p>
      {/* Bottom Section - Version Info */}
    </div>
  );
};

export default Nav;
