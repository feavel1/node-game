#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log(chalk.bgCyan("欢迎您"));

let playerName;

const sleep = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("谁最爱糖宝");
  await sleep();
  rainbowTitle.stop();
  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    我只是一个电脑里的程序.
    要是你答错了一道题这个游戏就会 ${chalk.bgRed("结束")}
    所以尝试每道题认真对待...
    `);
}

async function askName() {
  const answer = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answer.player_name;
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("checking answer...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}. 您答对啦! 耶`,
    });
  } else {
    spinner.error({
      text: `Game over ${playerName}. 您答错啦`,
    });
    process.exit(1);
  }
}

async function winner() {
  console.clear();
  const msg = `COOL ! YOU WON \n  ${playerName}`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

async function question1() {
  const answer = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "丹宝第一次见到糖宝是在哪天?\n",
    choices: ["1月9号, 2021", "9月1号, 2020", "1月11号, 2021", "3月8号, 2021"],
  });
  return handleAnswer(answer.question_1 == "1月11号, 2021");
}
async function question2() {
  const answer = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "丹宝有多爱糖宝?\n",
    choices: [
      "不爱",
      "爱, 但是没糖宝那么爱",
      "爱, 但可能有点爱别的女人",
      "超级爱",
    ],
  });

  return handleAnswer(answer.question_2 == "超级爱");
}

async function question3() {
  const answer = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "糖宝和丹宝哪天出来玩让他们互相爱上了?\n",
    choices: [
      "不记得, 但大概是2021年7月",
      "7月10号, 2021",
      "忘了",
      "7月15号, 2021",
    ],
  });

  return handleAnswer(answer.question_3 == "7月15号, 2021");
}

async function question4() {
  const answer = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "第一次亲亲的时候丹宝问了什么问题?\n",
    choices: ["你爱我吗？", "你想和我亲嘴吗？", "我要亲你勒！！！", "（无）"],
  });

  return handleAnswer(answer.question_4 == "你爱我吗？");
}

async function question5() {
  const answer = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "丹宝和糖宝谁更厉害?\n",
    choices: ["糖宝?", "丹宝?", "我要打死你勒！！！", "都很厉害"],
  });

  return handleAnswer(answer.question_5 == "糖宝?");
}

async function question6() {
  const answer = await inquirer.prompt({
    name: "question_6",
    type: "list",
    message: "糖宝跟丹宝在一起之后第一次约会去了哪里?\n",
    choices: ["看海", "游乐园", "书城", "哪都没去"],
  });

  return handleAnswer(answer.question_6 == "书城");
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await winner();
