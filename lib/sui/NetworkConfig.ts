import { getFullnodeUrl } from "@mysten/sui/client";
import {PACKAGE_ID} from "@/constants/constant";

import { createNetworkConfig } from "@mysten/dapp-kit";

const { useNetworkVariable } =
  createNetworkConfig({
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        campaignPackageId: PACKAGE_ID,
      },
    },
    
   
  });

export { useNetworkVariable};
