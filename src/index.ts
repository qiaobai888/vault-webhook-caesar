import { Elysia, type Context } from "elysia";

interface WithdrawRequestCollateral {
  collateralId: string;
  amount: string;
}

interface WithdrawRequestPayload {
  reqId: string;
  settleBeforeSec: string;
  shareAmount: string;
  expectedCollaterals: WithdrawRequestCollateral[];
  retryCount: number;
}

interface WithdrawRequestResult {
  reqId: string;
  success: boolean;
}

const app = new Elysia({ aot: false })
  .get("/", () => "works")
  .get("/ping", () => "pong")
  .post("/withdraw-req", ({ body }) => {
    const payload = body as WithdrawRequestPayload;

    console.log(payload);

    const result = {
      reqId: payload.reqId,
      success: true,
    } satisfies WithdrawRequestResult;

    return result;
  });

interface Env { }

export default {
  async fetch(request: Request, _env: Env, _ctx: Context): Promise<Response> {
    return await app.fetch(request)
  }
}
