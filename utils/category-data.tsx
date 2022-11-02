import {
  IconFileText,
  IconBrowser,
  IconRepeat,
  IconHome,
  TablerIcon,
  IconAB,
  IconLock,
} from '@tabler/icons';
import { GridItem } from '../components/ToolsActionGrid';

type Category = {
  label: string;
  description: string;
  icon: TablerIcon;
  color: string;
  link: string;
  children?: Category[];
};

const home: Category = {
  label: 'Home',
  description: 'Get to home page',
  icon: IconHome,
  color: 'violet',
  link: '/',
};

const base64EncodeDecode: Category = {
  label: 'Base64 encode/decode',
  description: 'Base64 encode and decode',
  icon: IconFileText,
  color: 'violet',
  link: '/encode-decode/base64',
};

const urlEncodeDecode: Category = {
  label: 'URL encode/decode',
  description: 'URL encode and decode',
  icon: IconBrowser,
  color: 'indigo',
  link: '/encode-decode/url',
};

const md5Encrypt: Category = {
  label: 'MD5 encrypt',
  description: 'MD5 encrypt',
  icon: IconFileText,
  color: 'violet',
  link: '/encrypt/md5',
};

const unixTimeConvert: Category = {
  label: 'Date-time convert',
  description: 'Unix timestamp convertions',
  icon: IconRepeat,
  color: 'blue',
  link: '/time/unixtime',
};

const passwordGenerator: Category = {
  label: 'Password generate',
  description: 'Password generator',
  icon: IconLock,
  color: 'blue',
  link: '/string/password',
};

// spotlight
export const spotlightItems: GridItem[] = [
  home,
  base64EncodeDecode,
  urlEncodeDecode,
  md5Encrypt,
  unixTimeConvert,
  passwordGenerator,
];

// index
export const categories: GridItem[] = [
  base64EncodeDecode,
  urlEncodeDecode,
  md5Encrypt,
  unixTimeConvert,
  passwordGenerator,
];

// sidebar
export const sampleMenuData = [
  {
    label: '加解密',
    icon: IconLock,
    color: 'blue',
    links: [
      { icon: IconLock, label: 'MD5 encrypt', link: md5Encrypt.link },
      { icon: IconLock, label: 'Password generate', link: passwordGenerator.link },
    ],
  },
  {
    label: '格式转换',
    icon: IconAB,
    color: 'blue',
    links: [
      { icon: IconLock, label: 'Base64 encode/decode', link: base64EncodeDecode.link },
      { icon: IconLock, label: 'URL encode/decode', link: urlEncodeDecode.link },
      { icon: IconLock, label: 'Date-time convert', link: unixTimeConvert.link },
    ],
  },
];
