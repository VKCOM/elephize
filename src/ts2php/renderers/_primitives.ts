import * as ts from 'typescript';
import { NodeDescription } from '../types';

export function tNotToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '!'
  };
}

export function tPlusPlusToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '++'
  };
}

export function tMinusMinusToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '--'
  };
}

export function tPlusToken(node: ts.PlusToken): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '+'
  };
}

export function tMinusToken(node: ts.MinusToken): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '-'
  };
}

export function tAsteriskToken(node: ts.AsteriskToken): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '*'
  };
}

export function tSlashToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '/'
  };
}

export function tPercentToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '%'
  };
}

export function tLogicOrToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '||'
  };
}

export function tLogicAndToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '&&'
  };
}

export function tBinaryOrToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '|'
  };
}

export function tBinaryAndToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '&'
  };
}

export function tPlusEqToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '+='
  };
}

export function tMinusEqToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '-='
  };
}

export function tAsteriskEqToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '*='
  };
}

export function tSlashEqToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '/='
  };
}

export function tPercentEqToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '%='
  };
}

export function tBinaryOrEqToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '|='
  };
}

export function tBinaryAndEqToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '&='
  };
}

export function tEqualsGreaterThanToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '>='
  };
}

export function tEqualsLessThanToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '<='
  };
}

export function tGreaterThanToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '>'
  };
}

export function tLessThanToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '<'
  };
}

export function tEqualsToken(node: ts.EqualsToken): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '='
  };
}

export function tEqualsEqualsToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '=='
  };
}

export function tEqualsEqualsStrictToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '==='
  };
}

export function tNotEqualsToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '!='
  };
}

export function tNotEqualsStrictToken(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '!=='
  };
}


export function tTrueKeyword(node: ts.BooleanLiteral): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => 'true'
  };
}

export function tFalseKeyword(node: ts.BooleanLiteral): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => 'false'
  };
}

export function tNullLiteral(node: ts.NullLiteral): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => 'null'
  };
}

export function tUndefinedLiteral(node: ts.Node): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => 'null'
  };
}

export function tBreakStatement(node: ts.BreakStatement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => 'break;'
  };
}

export function tContinueStatement(node: ts.ContinueStatement): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => 'continue;'
  };
}

export function tEndOfFileToken(node: ts.EndOfFileToken): NodeDescription {
  return {
    kind: node.kind,
    supported: true,
    gen: () => '\n'
  };
}