<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vuepress/client';

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

onMounted(() => {
    useRouter().replace(props.to);
});
</script>
