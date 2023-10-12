import discord
from discord.ext import commands

bot = commands.Bot(command_prefix="/")  # Set your desired command prefix

@bot.command()
async def website(ctx):
    """Get official documentation on the bot."""
    # Replace the following with actual information about your website
    website_name = "UntoldRP"
    website_url = "https://untoldRP.jack27890.repl.co/documentation"
    description = "documentation"

    embed = discord.Embed(title=website_name, url=website_url, description=description)
    embed.set_thumbnail(url="ps1.jpg")  
    embed.add_field(name="About", value="Welcome to my website! Explore and enjoy.", inline=False)
    embed.add_field(name="Contact", value="Feel free to reach out via email or social media.", inline=False)

    await ctx.send(embed=embed)

# Run the bot with your token
bot.run('MTE0ODgzNDk1MzE2MTg2NzI2NA.Gqp1Yd.yBPndj3J9k2415AfLpzmohGMFGRGfyXD9usIS8')