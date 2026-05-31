const { deepMerge, interpolateEnv } = require('./mcp-merger');

describe('mcp-merger', () => {
  describe('deepMerge', () => {
    it('merges two JSON objects deeply', () => {
      const target = { a: 1, b: { x: 10 } };
      const source = { b: { y: 20 }, c: 3 };
      const result = deepMerge(target, source);
      
      expect(result).toEqual({
        a: 1,
        b: { x: 10, y: 20 },
        c: 3
      });
    });

    it('overwrites primitives with new values', () => {
      const target = { a: 1, b: "old" };
      const source = { b: "new" };
      const result = deepMerge(target, source);
      
      expect(result).toEqual({ a: 1, b: "new" });
    });
  });

  describe('interpolateEnv', () => {
    it('replaces ${VAR} with environment variables', () => {
      const obj = {
        config: {
          token: "${MY_TOKEN}",
          host: "${MY_HOST}"
        }
      };
      const env = {
        MY_TOKEN: "secret123",
        MY_HOST: "localhost"
      };
      
      const result = interpolateEnv(obj, env);
      
      expect(result).toEqual({
        config: {
          token: "secret123",
          host: "localhost"
        }
      });
    });

    it('replaces missing variables with empty strings', () => {
      const obj = { key: "${MISSING_KEY}" };
      const result = interpolateEnv(obj, {});
      expect(result).toEqual({ key: "" });
    });
  });
});