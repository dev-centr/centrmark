module centrmark_ffi.ffi;

import core.stdc.stdlib : malloc, free;
import core.stdc.string : memcpy;
import object : size_t;

import centrmark.parser : parseCmk;
import centrmark.json : toJsonCanonical, toJsonCanonicalOptimized;

private char[] cStringToCharArray(const(char)* input, size_t len)
{
	// Treat input as a byte slice and reinterpret as a D char[] without copying.
	// The resulting array is valid for the duration of this call.
	return cast(char[]) input[0 .. len];
}

private extern(C) char* allocAndCopyUtf8(string s, out size_t outLen)
{
	outLen = cast(size_t)s.length;
	auto buf = cast(char*)malloc(outLen + 1);
	if (buf == null)
		throw new Exception("FFI allocation failed");

	if (outLen > 0)
		memcpy(buf, s.ptr, outLen);
	buf[outLen] = 0;
	return buf;
}

// Reference (single-threaded) path.
extern(C) char* cmk_parse_ref(const(char)* input, size_t len, out size_t outLen)
{
	auto slice = cStringToCharArray(input, len);
	auto doc = parseCmk(cast(string)slice);
	auto json = toJsonCanonical(doc);
	return allocAndCopyUtf8(json, outLen);
}

// Optimized (multithreaded serialization) path.
extern(C) char* cmk_parse_opt(const(char)* input, size_t len, out size_t outLen)
{
	auto slice = cStringToCharArray(input, len);
	auto doc = parseCmk(cast(string)slice);
	auto json = toJsonCanonicalOptimized(doc);
	return allocAndCopyUtf8(json, outLen);
}

extern(C) void cmk_free(char* p)
{
	if (p != null)
		free(p);
}

