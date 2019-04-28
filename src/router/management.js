import Management from '@/components/management/Management.vue'
import Page1 from '@/components/management/components/page1.vue'
import Page2 from '@/components/management/components/page2.vue'
import Page3 from '@/components/management/components/page3.vue'
import Page4 from '@/components/management/components/page4.vue'
import Page5 from '@/components/management/components/page5.vue'
import Page6 from '@/components/management/components/page6.vue'
import Page7 from '@/components/management/components/page7.vue'
import Page8 from '@/components/management/components/page8.vue'
import Page9 from '@/components/management/components/page9.vue'
import Page10 from '@/components/management/components/page10.vue'
import Page11 from '@/components/management/components/page11.vue'
import Page12 from '@/components/management/components/page12.vue'
import Page13 from '@/components/management/components/page13.vue'

export default [{
  path: '/management',
  name: 'management',
  component: Management,
  redirect: '/management/page1',
  meta: {
    title: "阿拉丁BIM5D云平台"
  },
  children: [{
      path: 'page1',
      component: Page1
    },
    {
      path: 'page2',
      component: Page2
    },
    {
      path: 'page3',
      component: Page3
    },
    {
      path: 'page4',
      component: Page4
    },
    {
      path: 'page5',
      component: Page5
    },
    {
      path: 'page6',
      component: Page6
    },
    {
      path: 'page7',
      component: Page7
    },
    {
      path: 'page8',
      component: Page8
    },
    {
      path: 'page9',
      component: Page9
    },
    {
      path: 'page10',
      component: Page10
    },
    {
      path: 'page11',
      component: Page11
    },
    {
      path: 'page12',
      component: Page12
    },
    {
      path: 'page13',
      component: Page13
    }
  ]
}]
