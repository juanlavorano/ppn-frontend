import { PPN_ABI } from "constants/abi";
import { PPN_ADDRESS } from "constants/address";
import useReefNetwork from "@hooks/useReefNetwork";
import { Signer } from "@reef-defi/evm-provider";

export default function useContract() {
  const { provider } = useReefNetwork();

  return "hola";
}
