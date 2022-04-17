import usePolkadotApi from "./useReefNetwork";
import { getInjector } from "utils/connect";

export default function useTransactions(account) {
  const { api } = usePolkadotApi();

  const send = async (data) => {
    // to be able to retrieve the signer interface from this account
    // we can use web3FromSource which will return an InjectedExtension type
    const injector = await getInjector(account.meta.source);

    // this injector object has a signer and a signRaw method
    // to be able to sign raw bytes
    const signRaw = injector?.signer?.signRaw;

    if (!!signRaw) {
      // after making sure that signRaw is defined
      // we can use it to sign our message
      const { signature } = await signRaw({
        address: account.address,
        data,
        type: "bytes",
      });

      return signature;
    }
  };

  const signAndSend = async (account) => {
    const TestAccountAddresTwo =
      "5CLwyV5FAtHygMwVc8jLUFtA68h2eGJWkt2uxdf4Mg7BgRuC";

    const transferExtrinsic = api.tx.balances.transfer(
      TestAccountAddresTwo,
      100
    );

    // to be able to retrieve the signer interface from this account
    // we can use web3FromSource which will return an InjectedExtension type
    const injector = await getInjector(account);

    // passing the injected account address as the first argument of signAndSend
    // will allow the api to retrieve the signer and the user will see the extension
    // popup asking to sign the balance transfer transaction
    transferExtrinsic
      .signAndSend(
        account.address,
        { signer: injector.signer },
        ({ status }) => {
          if (status.isInBlock) {
            console.log(
              `Completed at block hash #${status.asInBlock.toString()}`
            );
          } else {
            console.log(`Current status: ${status.type}`);
          }
        }
      )
      .catch((error) => {
        console.log(":( transaction failed", error);
      });
  };

  return { send, signAndSend };
}
