import * as anchor from "@coral-xyz/anchor";
import assert from "assert";
import * as web3 from "@solana/web3.js";
import type { AccessCounter } from "../target/types/access_counter";

describe("access_counter", () => {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AccessCounter as anchor.Program<AccessCounter>;
  
  const user = pg.wallet;
  let counterPda: web3.PublicKey;
  let bump: number;

  before(async () => {
    if (!program) {
      throw new Error(
        "Program not loaded. Build your program before running tests."
      );
    }

    [counterPda, bump] = await web3.PublicKey.findProgramAddress(
      [Buffer.from("counterN"), user.publicKey.toBuffer()],
      program.programId
    );
  });

  it("Initializes counter using pg.wallet", async () => {
    const tx = await program.methods
      .initialize(bump)
      .accounts({
        counter: counterPda,
        user: user.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    const account = await program.account.counterAccount.fetch(counterPda);
    assert.equal(account.count.toNumber(), 0);
    assert.ok(account.authority.equals(user.publicKey));
  });

  it("Allows authority to increment counter", async () => {
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counterPda,
        user: user.publicKey,
      })
      .rpc();

    const account = await program.account.counterAccount.fetch(counterPda);
    assert.equal(account.count.toNumber(), 1);
  });

  // **** advanced task

  // it("Rejects increment from non-authority", async () => {
  //   const stranger = web3.Keypair.generate();

  //   // Airdrop to stranger so he can sign
  //   const sig = await program.provider.connection.requestAirdrop(
  //     stranger.publicKey,
  //     web3.LAMPORTS_PER_SOL
  //   );
  //   await program.provider.connection.confirmTransaction(sig);

  //   try {
  //     await program.methods
  //       .increment()
  //       .accounts({
  //         counter: counterPda,
  //         user: stranger.publicKey,
  //       })
  //       .signers([stranger])
  //       .rpc();

  //     assert.fail("Increment should have failed for non-authority");
  //   } catch (err) {
  //     console.log("Expected failure:", err.message);
  //     assert.match(err.message, /Unauthorized/); // Проверка на кастомную ошибку
  //   }
  // });
});
