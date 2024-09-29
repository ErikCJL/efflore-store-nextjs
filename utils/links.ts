type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "Tela Incial" },
  { href: "/about", label: "Sobre Nós" },
  { href: "/products", label: "Produtos" },
];

export const loggedLinks: NavLink[] = [
  { href: "/favorites", label: "Favoritos" },
  { href: "/cart", label: "Carrinho" },
  { href: "/orders", label: "Ordens" },
];

export const adminLinks: NavLink[] = [
  { href: "/admin/sales", label: "Controle" },
  { href: "/admin/products", label: "Produtos" },
  { href: "/admin/products/create", label: "Criar Produto" },
];
