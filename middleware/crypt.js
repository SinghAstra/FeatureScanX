import crypto from "crypto";
var password = process.env.CRYPT_PASSWORD;
// var iv = Buffer.from(process.env.IV);

function sha1(input) {
  return crypto.createHash("sha1").update(input).digest();
}

function password_derive_bytes(password, salt, iterations, len) {
  var key = Buffer.from(password + salt);
  for (var i = 0; i < iterations; i++) {
    key = sha1(key);
  }
  if (key.length < len) {
    var hx = password_derive_bytes(password, salt, iterations - 1, 20);
    for (var counter = 1; key.length < len; ++counter) {
      key = Buffer.concat([
        key,
        sha1(Buffer.concat([Buffer.from(counter.toString()), hx])),
      ]);
    }
  }
  return Buffer.alloc(len, key);
}

export async function encode(string) {
  var key = password_derive_bytes(password, "", 100, 16);
  var iv = crypto.randomBytes(16);
  var cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  var part1 = cipher.update(string, "utf8");
  var part2 = cipher.final();
  const encrypted = Buffer.concat([iv, part1, part2]).toString("base64");
  return encrypted;
}

export async function decode(string) {
  var key = password_derive_bytes(password, "", 100, 16);
  const data = Buffer.from(string, "base64");
  const uint8Array = new Uint8Array(data);
  const iv = uint8Array.slice(0, 16);
  const encryptedText = uint8Array.slice(16);
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "base64", "utf8");
  decrypted += decipher.final();
  return decrypted;
}
