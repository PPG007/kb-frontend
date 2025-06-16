import 'element-plus/theme-chalk/dark/css-vars.css';
import 'vanilla-jsoneditor/themes/jse-theme-dark.css';
import { defineClientConfig } from 'vuepress/client';
import { useDarkMode } from 'vuepress-theme-hope/client';
import { onMounted, watch } from 'vue';
import { colors } from './styles';

const setElementUIDark = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const setThemeColor = (color: string) => {
  const index = colors.indexOf(color);
  if (index === -1) {
    return;
  }
  document.documentElement.classList.forEach((className) => {
    if (className.startsWith('theme-')) {
      document.documentElement.classList.remove(className);
    }
  });
  if (index) {
    document.documentElement.classList.add(`theme-${index + 1}`);
  }
}

export default defineClientConfig({
  setup() {
    const { isDarkMode } = useDarkMode();
    watch(isDarkMode, () => {
      setElementUIDark(isDarkMode.value);
    });
    onMounted(async () => {
      const { useElementPlusTheme } = await import('use-element-plus-theme');
      const { changeTheme } = useElementPlusTheme();
      setElementUIDark(isDarkMode.value);
      window.parent.postMessage('ready');
      window.addEventListener('message', ({ data }) => {
        if (data.type === 'themeColorUpdated' && typeof data.value === 'string') {
          changeTheme(data.value);
          setThemeColor(data.value);
        }
      })
    });
  },
});
