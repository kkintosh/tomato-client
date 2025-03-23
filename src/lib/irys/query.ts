import axios from "axios";

import { irysQueryConfig } from "@/config/irys";

export function getAllTransactionByAddress(address: string) {
  axios({
    url: irysQueryConfig.baseUrl,
    method: "post",
    data: {
      query: `
        query getByOwner {
          transactions (
            owners: [
                "${address}"
            ]
          ) {
            edges {
              node {
                id
                timestamp
              }
            }
          }
        }
      `,
    },
  }).then((result) => {
    console.log(result.data);
  });
}
