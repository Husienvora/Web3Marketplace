import { useAccount } from "@components/hooks/web3";
import { Breadcrumbs } from "@components/ui/common";
import { EthRates, WalletBar } from "@components/ui/web3";

const LINKS = [
  {
    href: "/marketplace/index1",
    value: "Buy Courses",
  },
  {
    href: "/marketplace/index2",
    value: "Buy Nft's",
  },
  {
    href: "/marketplace/courses/owned",
    value: "My Courses",
  },
  {
    href: "/marketplace/courses/managed",
    value: "Manage Courses",
    requireAdmin: true,
  },
  {
    href: "/marketplace/nfts/owned",
    value: "Owned nfts",
  },
  {
    href: "/marketplace/nfts/upload",
    value: "upload nfts",
    requireAdmin: true,
  },
];

export default function Header() {
  const { account } = useAccount();
  return (
    <>
      <div className="pt-4">
        <WalletBar />
      </div>
      <EthRates />
      <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
        <Breadcrumbs isAdmin={account.isAdmin} items={LINKS} />
      </div>
    </>
  );
}
