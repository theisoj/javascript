import crypto from 'node:crypto';
import { TextDecoder, TextEncoder } from 'node:util';

import { jest } from '@jest/globals';

class FakeResponse {}

if (typeof window !== 'undefined') {
  Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder },
    TextEncoder: { value: TextEncoder },
    Response: { value: FakeResponse },
    crypto: { value: crypto.webcrypto },
  });

  window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }));

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  //@ts-expect-error
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}

    disconnect() {
      return null;
    }

    observe() {
      return null;
    }

    takeRecords() {
      return null;
    }

    unobserve() {
      return null;
    }
  };
}
