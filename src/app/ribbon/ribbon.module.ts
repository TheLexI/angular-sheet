import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationMenuComponent } from './ribbon/application-menu/application-menu.component';
import { ApplicationMenuItemComponent } from './ribbon/application-menu/application-menu-item/application-menu-item.component';
import { TabComponent } from './ribbon/tab/tab.component';
import { GroupComponent } from './ribbon/tab/group/group.component';
import { RibbonComponent } from './ribbon/ribbon.component';
import { PanelComponent } from './ribbon/tab/group/panel/panel.component';
import { QuickAccessToolBarComponent } from './ribbon/quick-access-tool-bar/quick-access-tool-bar.component';
import { ButtonComponent } from './controls/button/button.component';
import { ButtonToggleComponent } from './controls/button-toggle/button-toggle.component';
import { BtnGroupComponent } from './controls/btn-group/btn-group.component';
import { BtnGroupItemComponent } from './controls/btn-group/btn-group-item/btn-group-item.component';
import { ControlGroupComponent } from './controls/control-group/control-group.component';
import { SelectComponent } from './controls/select/select.component';
import { OptionComponent } from './controls/select/option/option.component';
import { SubmenuComponent } from './controls/submenu/submenu.component';
import { SubmenuRefDirective } from './controls/submenu/submenu-ref.directive';
import { DomPipe } from './dom.pipe';



@NgModule({
  declarations: [
    ApplicationMenuComponent,
    ApplicationMenuItemComponent,
    TabComponent,
    GroupComponent,
    RibbonComponent,
    PanelComponent,
    QuickAccessToolBarComponent,
    ButtonComponent,
    ButtonToggleComponent,
    BtnGroupComponent,
    BtnGroupItemComponent,
    ControlGroupComponent,
    SelectComponent,
    OptionComponent,
    SubmenuComponent,
    SubmenuRefDirective,
    DomPipe],
  imports: [CommonModule],
  exports: [
    ApplicationMenuComponent,
    ApplicationMenuItemComponent,
    TabComponent,
    GroupComponent,
    RibbonComponent,
    PanelComponent,
    QuickAccessToolBarComponent,
    ButtonComponent,
    ButtonToggleComponent,
    BtnGroupComponent,
    BtnGroupItemComponent,
    ControlGroupComponent,
    SelectComponent,
    OptionComponent,
    SubmenuComponent,
    SubmenuRefDirective,
    DomPipe
  ]
})
export class RibbonModule { }
