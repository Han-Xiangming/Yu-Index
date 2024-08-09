import { CommandType } from "../../command";
import baiduCommand from "./baiduCommand";
import baidudevCommand from "./baidudevCommand";
import bilibiliCommand from "./bilibili/bilibiliCommand";
import bingCommand from "./bingCommand";
import codenavCommand from "./codenavCommand";
import doubanCommand from "./doubanCommand";
import douyinCommand from "./douyinCommand";
import githubCommand from "./githubCommand";
import googleCommand from "./googleCommand";
import wangyiyunCommand from "./wangyiyunCommand";
import zhihuCommand from "./zhihuCommand";
import gengCommand from "./gengCommand";
import duckduckgoCommand from "./duckduckgoCommand";
import fsearchCommand from "./fsearchCommand";
import sogouCommand from "./sogouCommand";
import mdnCommand from "./mdnCommand";
import stackoverflowCommand from "./stackoverflowCommand";

/**
 * 搜索源
 */
const fromDict: Record<string, CommandType> = {
  baidu: baiduCommand,
  baidudev: baidudevCommand,
  bilibili: bilibiliCommand,
  bing: bingCommand,
  codenav: codenavCommand,
  douban: doubanCommand,
  douyin: douyinCommand,
  duckduckgo: duckduckgoCommand,
  fsearch: fsearchCommand,
  geng: gengCommand,
  github: githubCommand,
  google: googleCommand,
  mdn: mdnCommand,
  sogou: sogouCommand,
  stackoverflow: stackoverflowCommand,
  wangyiyun: wangyiyunCommand,
  zhihu: zhihuCommand,
};

/**
 * 搜索命令
 * @author Han-Xiangming
 */
const searchCommand: CommandType = {
  func: "search",
  name: "网页搜索",
  alias: ["s", "sousuo", "sou", "query",'sch'],
  desc: "支持从不同平台快捷搜索内容",
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      // 来源
      key: "from",
      alias: ["f"],
      type: "string",
      defaultValue: "bing",
    },
    {
      key: "self",
      desc: "是否当前页面打开",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  // 默认使用必应搜索
  action: (options, terminal) => {
    const { from = "bing" } = options;
    // 执行不同搜索源的搜索方法
    const fromObj = fromDict[from];
    if (!fromObj) {
      terminal.writeTextErrorResult("找不到搜索源");
      return;
    }
    return fromObj.action(options, terminal);
  },
};

export default [searchCommand, ...Object.values(fromDict)];
