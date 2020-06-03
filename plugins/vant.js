/**
 * 按需导入组件挂载到全局
 */
import Vue from "vue";
import "vant/lib/index.css";
import { 
  Tabbar, TabbarItem, NavBar, Toast, Icon, Notify, List, Cell,
  CellGroup, Image as VanImage, PullRefresh, Form, Field, Button,
  Uploader, NumberKeyboard, Divider, Swipe, SwipeItem, Lazyload,
  ShareSheet, Calendar, DatetimePicker, Popup, Picker, Area, Tab, Tabs,
  Step, Steps, Grid, GridItem, Sidebar, SidebarItem, IndexBar, 
  IndexAnchor, CountDown, Card, Tag,
} from "vant";

[
  Tabbar, TabbarItem, NavBar, Toast, Icon, Notify, List, Cell,
  CellGroup, VanImage , PullRefresh, Form, Field, Button, Uploader,
  NumberKeyboard, Divider, Swipe, SwipeItem, Lazyload, ShareSheet,
  Calendar, DatetimePicker, Popup, Picker, Area, Tab, Tabs, Step,
  Steps, Grid, GridItem, Sidebar, SidebarItem, IndexBar, IndexAnchor,
  CountDown, Card, Tag, 
].forEach(v => {
  Vue.use(v);
});

