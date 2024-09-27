type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "Tela Incial" },
  { href: "/about", label: "Sobre Nós" },
  { href: "/products", label: "Produtos" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/cart", label: "Carrinho" },
  { href: "/orders", label: "Ordens" },
  { href: "/admin/sales", label: "Controle" },
];

export const adminLinks: NavLink[] = [
  { href: "/admin/sales", label: "Vendas" },
  { href: "/admin/products", label: "Admin: Produtos" },
  { href: "/admin/products/create", label: "Criar Produto" },
];
