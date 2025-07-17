describe("access_counter", () => {
  const user = pg.wallet;
  let counterPda: web3.PublicKey;
  let bump: number;

  before(async () => {
    if (!pg.program) {
      throw new Error(
        "Program not loaded. Build your program before running tests."
      );
    }

    [counterPda, bump] = await web3.PublicKey.findProgramAddress(
      [Buffer.from("counterN"), user.publicKey.toBuffer()],
      pg.program.programId
    );
  });

  it("Initializes counter using pg.wallet", async () => {
    const tx = await pg.program.methods
      .initialize(bump)
      .accounts({
        counter: counterPda,
        user: user.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    const account = await pg.program.account.counterAccount.fetch(counterPda);
    assert.equal(account.count.toNumber(), 0);
    assert.ok(account.authority.equals(user.publicKey));
  });

  it("Allows authority to increment counter", async () => {
    const tx = await pg.program.methods
      .increment()
      .accounts({
        counter: counterPda,
        user: user.publicKey,
      })
      .rpc();

    const account = await pg.program.account.counterAccount.fetch(counterPda);
    assert.equal(account.count.toNumber(), 1);
  });

  // **** advanced task

  // it("Rejects increment from non-authority", async () => {
  //   const stranger = web3.Keypair.generate();

  //   // Airdrop to stranger so he can sign
  //   const sig = await pg.connection.requestAirdrop(
  //     stranger.publicKey,
  //     web3.LAMPORTS_PER_SOL
  //   );
  //   await pg.connection.confirmTransaction(sig);

  //   try {
  //     await pg.program.methods
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