const discord = require("discord.js");

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const genEmbed = (data) => {
  let embed = new discord.MessageEmbed();
  let emote;
  let isMarketOpen;

  data.isUSMarketOpen ? (isMarketOpen = "Yes") : (isMarketOpen = "No");

  data.change > 1
    ? (emote = ":rocket:")
    : data.change > 0
    ? (emote = ":chart_with_upwards_trend:")
    : data.change < 0
    ? (emote = ":chart_with_downwards_trend:")
    : (emote = ":zzz:");

  embed
    .setColor("#0099ff")
    .setAuthor("Stocks Bot")
    .setTitle(`${data.companyName} ${emote}`)
    .setAuthor(data.symbol)
    .setDescription(data.primaryExchange)
    .setFooter(`Last updated: ${new Date(data.latestUpdate)}`)
    .addFields(
      { name: "Latest Price:", value: "$" + data.latestPrice, inline: true },
      {
        name: "Previous Close:",
        value: "$" + data.previousClose,
        inline: true,
      },
      { name: "Change:", value: "$" + data.change, inline: true },
      {
        name: "Market Cap:",
        value: numberWithCommas(data.marketCap),
        inline: true,
      },
      {
        name: "Percentage Change:",
        value: `${(data.changePercent * 100).toFixed(3)}%`,
        inline: true,
      },
      {
        name: "YTD Change:",
        value: `${(data.ytdChange * 100).toFixed(3)}%`,
        inline: true,
      },
      { name: "Is Market Open?", value: isMarketOpen }
    );

  return embed;
};

exports.genEmbed = genEmbed;
