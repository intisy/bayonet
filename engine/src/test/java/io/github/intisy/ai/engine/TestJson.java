package io.github.intisy.ai.engine;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * A minimal JSON reader for fixtures of known shape: objects, arrays, strings, numbers, booleans,
 * null.
 *
 * @implNote Deliberately hand-written and test-only. This module has no dependencies, and adding one
 * to read two files of known shape would trade that away for nothing. Objects keep their written
 * order so a caller may compare against a {@code LinkedHashMap} without reordering either side.
 */
final class TestJson {

    private final String text;
    private int at = 0;

    TestJson(String text) {
        this.text = text;
    }

    Object read() {
        skipSpace();
        Object value = readValue();
        skipSpace();
        return value;
    }

    private Object readValue() {
        char current = text.charAt(at);
        if (current == '{') {
            return readObject();
        }
        if (current == '[') {
            return readArray();
        }
        if (current == '"') {
            return readString();
        }
        if (text.startsWith("true", at)) {
            at += 4;
            return Boolean.TRUE;
        }
        if (text.startsWith("false", at)) {
            at += 5;
            return Boolean.FALSE;
        }
        if (text.startsWith("null", at)) {
            at += 4;
            return null;
        }
        return readNumber();
    }

    private Map<String, Object> readObject() {
        Map<String, Object> result = new LinkedHashMap<String, Object>();
        at++;
        skipSpace();
        if (text.charAt(at) == '}') {
            at++;
            return result;
        }
        while (true) {
            skipSpace();
            String key = readString();
            skipSpace();
            at++;
            skipSpace();
            result.put(key, readValue());
            skipSpace();
            char separator = text.charAt(at++);
            if (separator == '}') {
                return result;
            }
        }
    }

    private List<Object> readArray() {
        List<Object> result = new ArrayList<Object>();
        at++;
        skipSpace();
        if (text.charAt(at) == ']') {
            at++;
            return result;
        }
        while (true) {
            skipSpace();
            result.add(readValue());
            skipSpace();
            char separator = text.charAt(at++);
            if (separator == ']') {
                return result;
            }
        }
    }

    private String readString() {
        StringBuilder out = new StringBuilder();
        at++;
        while (true) {
            char current = text.charAt(at++);
            if (current == '"') {
                return out.toString();
            }
            if (current == '\\') {
                char escaped = text.charAt(at++);
                if (escaped == 'n') {
                    out.append('\n');
                } else if (escaped == 't') {
                    out.append('\t');
                } else {
                    out.append(escaped);
                }
                continue;
            }
            out.append(current);
        }
    }

    private Object readNumber() {
        int start = at;
        while (at < text.length() && "-+.eE0123456789".indexOf(text.charAt(at)) >= 0) {
            at++;
        }
        String literal = text.substring(start, at);
        if (literal.indexOf('.') < 0 && literal.indexOf('e') < 0 && literal.indexOf('E') < 0) {
            return Integer.valueOf(Integer.parseInt(literal));
        }
        return Double.valueOf(Double.parseDouble(literal));
    }

    private void skipSpace() {
        while (at < text.length() && Character.isWhitespace(text.charAt(at))) {
            at++;
        }
    }
}
