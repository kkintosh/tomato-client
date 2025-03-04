import { Network } from "@aptos-labs/ts-sdk";
import { ConstructableWebToken, type TokenConfigTrimmed } from "@irys/web-upload/builder";

import BaseAptosToken from "./token";

export class AptosToken extends BaseAptosToken {
  constructor(config: TokenConfigTrimmed) {
    super({
      name: "aptos",
      ticker: "APT",
      ...config,
      providerUrl: config.providerUrl ?? Network.TESTNET,
    });
  }
}

// export function AptosBundlerWebIrys() {
//     return new Builder(AptosToken)/* .withTokenOptions(opts) */
// }
// export default AptosBundlerWebIrys

export const WebAptos: ConstructableWebToken = AptosToken;
export default WebAptos;
