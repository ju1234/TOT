/**
 * Created by jufei on 2017/7/27.
 */
import React from 'react'
import Bundle from './Bundle';


export default function lazyLoad(lazySettingAccount) {
  return (props) => <Bundle load={lazySettingAccount}>{(SettingAccount) => <SettingAccount {...props}/>}</Bundle>;
}