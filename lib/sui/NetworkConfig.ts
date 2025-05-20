import { getFullnodeUrl } from "@mysten/sui/client";
import {TESTNET_COUNTER_PACKAGE_ID} from "./constants/constants";

import { createNetworkConfig } from "@mysten/dapp-kit";

const { useNetworkVariable } =
  createNetworkConfig({
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        counterPackageId: TESTNET_COUNTER_PACKAGE_ID,
      },
    },
    
   
  });

export { useNetworkVariable};
