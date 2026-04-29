module centrmark_cli.main;

import std.file : readText;
import std.stdio : stdin, stdout, stderr, writefln;
import std.string : strip;
import std.conv : to;

import centrmark.parser : parseCmk;
import centrmark.json : toJsonCanonical;

enum string CLI_VERSION = "0.1.0";

private void usage()
{
	writefln("centrmark-cli %s", CLI_VERSION);
	writefln("");
	writefln("Usage:");
	writefln("  centrmark parse <file>");
	writefln("  centrmark parse --stdin");
	writefln("  centrmark parse <file> --no-json");
	writefln("  centrmark version");
}

private string readStdinAll()
{
	string result;
	foreach (line; stdin.byLineCopy)
	{
		result ~= line;
		result ~= "\n";
	}
	return result;
}

int main(string[] args)
{
	if (args.length < 2)
	{
		usage();
		return 1;
	}

	auto cmd = args[1];
	switch (cmd)
	{
	case "version":
		writefln("%s", CLI_VERSION);
		return 0;

	case "parse":
		{
			string input;
			bool noJson = false;
			foreach (i, a; args)
			{
				if (a == "--no-json")
					noJson = true;
			}

			if (args.length >= 3 && args[2] == "--stdin")
			{
				input = readStdinAll();
			}
			else if (args.length >= 3)
			{
				auto filePath = args[2];
				input = readText(filePath);
			}
			else
			{
				usage();
				return 1;
			}

			auto doc = parseCmk(input);
			if (noJson)
			{
				stderr.writeln("parsed ok; blocks=" ~ to!string(doc.blocks.length));
				return 0;
			}

			stdout.writeln(toJsonCanonical(doc));
			return 0;
		}

	default:
		usage();
		return 1;
	}
}

