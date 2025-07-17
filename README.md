# EN. General Instructions
	•	The assignment will be provided in the README.md file of the repository.
	•	The candidate must share their screen.
	•	You will need to open Solpg IDE (https://beta.solpg.io/) and import the GitHub repository (the link will be sent in the Zoom chat after you start screen sharing).
	•	You’ll be asked to complete a simple task: a Rust counter Solana Smart Contract.
	•	The main KPI for evaluating your performance: applying all your knowledge of Rust + Anchor + Solana / successfully compiling the smart contract / passing test scenarios.
	•	The task is intentionally simple; one of the key requirements is making independent decisions.
	•	Test your contract using the Client → Test panel in Solpg.
	•	Once you’re done, please share your project using the Share button, and we’ll review and provide feedback.
	•	Important: You are not allowed to use AI tools. Using Google or the official documentation is acceptable and encouraged.

## Assignment: Mini Counter with Access Control (Rust + Anchor for Solana)

You need to develop a smart contract on Solana that implements a simple counter. The counter must:
	•	store a number (u64);
	•	allow incrementing only by the creator (authority) of the counter;
	•	allow any user to read the current count;
	•	be implemented using the Anchor framework.

## Technical Requirements:
	1.	Create an Anchor project named access_counter.
	2.	Define an account struct CounterAccount with:
	•	count: u64;
	•	authority: Pubkey (the creator of the counter).
	3.	Write an initialize(ctx) instruction that creates and initializes the CounterAccount.
	4.	Write an increment(ctx) instruction that checks whether the signer matches the authority, and increments count only if so.
	5.	Write a get_count(ctx) instruction — it can be empty; its purpose is to show how to read account data.

### Solana Helpers
	1.	Run build and deploy of your contract.
	2.	If you need more SOL:
	•	Your wallet / balance / network can be seen at the bottom of the IDE;
	•	You can use the faucet: https://faucet.solana.com/

# RU. Общие положения
- Cамо задание будет в README.md репозитория
- Кандидату надо расшарить экран
- Необходимо открыть **IDE Solpg** (https://beta.solpg.io/) и выполнить import GitHub репозитория (репозиторий вам скинут в zoom чат после того как вы пошарите экран)
- Нужно будет выполнить задание (оно простое: **Rust counter Solana Smart Contract**)
- Главный KPI по которому будет оцениваться работа - использование всех доступных знаний по работе Rust + Anchor + Solana / Компилируемый смарт-контракт / Выполнение тестовых сценариев
- Задание очень простое и одно из главных требований - самостоятельно принимать решение.
- Проверяйте работу контракта через Client -> Test  
- Как будете готовы скиньте пожалуйста свой проект через кнопку Share и мы вернемся с обратной связью
- **Большая просьба** - нельзя использовать любые AI. Google или документация - одобряется.

## Задание: Мини-счетчик с правами доступа (Rust + Anchor для Solana)
Ты разрабатываешь smart contract на Solana, который реализует простой счётчик. Этот счётчик:
- хранит число (u64);
- может быть увеличен, но только создателем (инициатором) счётчика;
- любой пользователь может прочитать значение счётчика;
- контракт должен быть реализован с использованием Anchor framework.

## Технические Требования:
1. Создай Anchor-проект с именем access_counter.
2. Создай структуру аккаунта CounterAccount, в которой будет:
    1. поле count: u64;
    2. поле authority: Pubkey (автор счётчика).
3. Напиши инструкцию initialize(ctx), которая создаёт и инициализирует CounterAccount.
4. Напиши инструкцию increment(ctx), которая проверяет, что отправитель транзакции (signer) совпадает с authority, и только тогда увеличивает count.
5. Напиши инструкцию get_count(ctx) — пусть она ничего не делает, просто показывает, как получать данные.

### Solana Helpers
1. Сделать build и deploy
2. Если вам не хватает средств
    1. кошелек / баланс / сеть - вы можете увидеть внизу IDE 
    2. вы можете использовать faucet https://faucet.solana.com/ 