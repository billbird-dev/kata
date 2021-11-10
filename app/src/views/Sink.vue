<script setup lang="ts">
import {
  Container,
  Header as KataHeader,
  HeaderHints,
  HeaderInfo,
  HeaderLogo,
} from '../../../lib/src';
import ComponentDesc from 'src/components/ComponentDesc.vue';
import ComponentWrap from 'src/components/ComponentWrap.vue';

const HeaderInfoData: HeaderHints = {
  name: 'Bangali Traders',
  address: 'Home',
  branch: 'BBSR',
  gstin: 'ssss',
  phone: '988989989',
};
</script>
<template>
  <div class="flex flex-col space-y-3 w-3/4 mx-auto">
    <div class="text-lg">Kitchen sink of all components</div>

    <component-wrap>
      <component-desc>
        <div class="text-sm">Container</div>
        <div class="text-xs">Wrapper for all components. A normal flex div</div>
      </component-desc>

      <template #component>
        <container>Hello</container>
      </template>
    </component-wrap>

    <component-wrap>
      <component-desc>
        <div class="text-sm">Header</div>
        <div class="text-xs">
          Invoice header which houses header info and logo. normal flex div
        </div>
      </component-desc>

      <template #component>
        <kata-header> I'm kata header </kata-header>
      </template>
    </component-wrap>

    <component-wrap>
      <component-desc>
        <div class="text-sm">Header info</div>
        <div class="text-xs">Kata header info</div>
      </component-desc>

      <template #component>
        <kata-header>
          <header-info :data="HeaderInfoData" :config="{ flex: 'none' }">
          </header-info>
        </kata-header>
      </template>
    </component-wrap>

    <component-wrap>
      <component-desc>
        <div class="text-sm">Header logo</div>
        <div class="text-xs">Kata header logo h-150px w-150px</div>
      </component-desc>

      <template #component>
        <kata-header>
          <header-logo
            img-src="https://sambitsahoo.com/vue-opinions.png"
            alt="Logo"
          />
        </kata-header>
      </template>
    </component-wrap>
  </div>
</template>
