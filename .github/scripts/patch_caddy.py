"""One-off Caddy patcher: adds a www->apex 308 redirect and security headers
to the saharasoft.org site block. Run on the VPS with the Caddyfile path as argv[1].
Idempotent: exits 0 without changes if the block already has HSTS."""

import re
import sys

path = sys.argv[1]
s = open(path).read()

block_re = re.compile(r"(?ms)^(saharasoft\.org[^\n]*\{)\n(.*?)^\}")
m = block_re.search(s)
assert m, "saharasoft.org block not found"
if "Strict-Transport-Security" in m.group(2):
    print("already patched, nothing to do")
    sys.exit(0)

opener, body = m.group(1), m.group(2)
redir = (
    "    @www host www.saharasoft.org\n"
    "    redir @www https://saharasoft.org{uri} permanent\n\n"
)
headers = (
    "\n    header {\n"
    '        Strict-Transport-Security "max-age=31536000; includeSubDomains"\n'
    '        X-Content-Type-Options "nosniff"\n'
    '        X-Frame-Options "DENY"\n'
    '        Referrer-Policy "strict-origin-when-cross-origin"\n'
    '        Permissions-Policy "camera=(), microphone=(), geolocation=()"\n'
    "        -Server\n"
    "    }\n"
)
patched = opener + "\n" + redir + body.rstrip("\n") + "\n" + headers + "}"
s = s[: m.start()] + patched + s[m.end():]
open(path, "w").write(s)
print("patched OK:", path)
