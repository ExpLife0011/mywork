/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50620
Source Host           : localhost:3306
Source Database       : pmp

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2017-01-13 15:15:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tb_info`
-- ----------------------------
/*DROP TABLE IF EXISTS `tb_info`;
CREATE TABLE `tb_info` (
  'info_id' int(10) NOT NULL AUTO_INCREMENT,
  'info1' varchar(100) DEFAULT NULL,
  'info2' varchar(100) DEFAULT NULL,
  'info3' varchar(100) DEFAULT NULL,
  PRIMARY KEY ('info_id')
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;*/


DROP TABLE IF EXISTS `tb_info`;
CREATE TABLE `tb_info` (
  `info_id` int(10) NOT NULL AUTO_INCREMENT,
  `info1` varchar(100) DEFAULT NULL,
  `info2` varchar(100) DEFAULT NULL,
  `info3` int(100) DEFAULT NULL,
  PRIMARY KEY (`info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
-- ----------------------------
-- Records of tb_info
-- ----------------------------
INSERT INTO `tb_info` VALUES ('1', 'a1', 'a2', 'a3');
INSERT INTO `tb_info` VALUES ('2', 'b1', 'b2', 'b3');
INSERT INTO `tb_info` VALUES ('3', 'c1', 'c2', 'c3');
INSERT INTO `tb_info` VALUES ('4', 'd1', 'd2', 'd3');
INSERT INTO `tb_info` VALUES ('5', 'e1', 'e2', 'e3');
INSERT INTO `tb_info` VALUES ('6', 'f1', 'f2', 'f3');
INSERT INTO `tb_info` VALUES ('7', 'g1', 'g2', 'g3');
INSERT INTO `tb_info` VALUES ('8', 'h1', 'h2', 'h3');
INSERT INTO `tb_info` VALUES ('9', 'i1', 'i2', 'i3');
INSERT INTO `tb_info` VALUES ('10', 'j1', 'j2', 'j3');
INSERT INTO `tb_info` VALUES ('11', 'k1', 'k2', 'k3');
INSERT INTO `tb_info` VALUES ('12', 'l1', 'l2', 'l3');
INSERT INTO `tb_info` VALUES ('13', 'm1', 'm2', 'm3');
INSERT INTO `tb_info` VALUES ('14', 'n1', 'n2', 'n3');
INSERT INTO `tb_info` VALUES ('15', 'o1', 'o2', 'o3');
INSERT INTO `tb_info` VALUES ('16', 'p1', 'p2', 'p3');
INSERT INTO `tb_info` VALUES ('17', 'q1', 'q2', 'q3');
INSERT INTO `tb_info` VALUES ('18', 'r1', 'r2', 'r3');
INSERT INTO `tb_info` VALUES ('19', 's1', 's2', 's3');
INSERT INTO `tb_info` VALUES ('20', 't1', 't2', 't3');
INSERT INTO `tb_info` VALUES ('21', 'u1', 'u2', 'u3');
INSERT INTO `tb_info` VALUES ('22', 'v1', 'v2', 'v3');
INSERT INTO `tb_info` VALUES ('23', 'w1', 'w2', 'w3');
INSERT INTO `tb_info` VALUES ('24', 'x1', 'x2', 'x3');
INSERT INTO `tb_info` VALUES ('25', 'y1', 'y2', 'y3');
INSERT INTO `tb_info` VALUES ('26', 'z1', 'z2', 'z3');

-- ----------------------------
-- Table structure for `tb_menu`
-- ----------------------------
DROP TABLE IF EXISTS `tb_menu`;
CREATE TABLE `tb_menu` (
  `menu_id` int(10) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(20) DEFAULT NULL,
  `menu_url` varchar(100) DEFAULT NULL,
  `parent_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_menu
-- ----------------------------
INSERT INTO `tb_menu` VALUES ('1', '系统管理', '', null);
INSERT INTO `tb_menu` VALUES ('2', '业务管理', '', null);
INSERT INTO `tb_menu` VALUES ('5', '用户管理', 'user.html', '1');
INSERT INTO `tb_menu` VALUES ('6', '角色管理', 'role.html', '1');
INSERT INTO `tb_menu` VALUES ('7', '菜单管理', 'menu.html', '1');
INSERT INTO `tb_menu` VALUES ('8', '分页', 'info.html', '2');
INSERT INTO `tb_menu` VALUES ('20', 'test', '', null);
INSERT INTO `tb_menu` VALUES ('21', 'test123', 'student.html', '20');

-- ----------------------------
-- Table structure for `tb_role`
-- ----------------------------
DROP TABLE IF EXISTS `tb_role`;
CREATE TABLE `tb_role` (
  `role_id` int(10) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(20) DEFAULT NULL,
  `rights` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_role
-- ----------------------------
INSERT INTO `tb_role` VALUES ('1', '系统管理员', '3145954');
INSERT INTO `tb_role` VALUES ('2', '普通用户', '2038792');
INSERT INTO `tb_role` VALUES ('3', '系统用户', '230374');
INSERT INTO `tb_role` VALUES ('4', 'test1', '2031616');

-- ----------------------------
-- Table structure for `tb_user`
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `rights` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `role_id` int(10) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('1', 'admin', 'admin', '管理员', '226', '0', '1', '2017-01-13 15:15:07');
INSERT INTO `tb_user` VALUES ('2', 'user1', '111111', '用户A1a', '40716', '0', '2', null);
INSERT INTO `tb_user` VALUES ('3', 'user2', '111111', '用户B', null, '0', null, '2011-06-13 15:39:08');
INSERT INTO `tb_user` VALUES ('4', 'user3', '111111', '用户3', null, '0', null, '2011-06-13 15:35:42');
INSERT INTO `tb_user` VALUES ('5', 'aaa', '1111', 'aaa', null, '0', null, null);
INSERT INTO `tb_user` VALUES ('6', 'bbb', '111111', 'dsfdsf2', null, '0', '1', '2015-11-09 09:39:02');
INSERT INTO `tb_user` VALUES ('7', 'fffff', '1', 'ddds', null, '0', null, null);
INSERT INTO `tb_user` VALUES ('10', 'abc', '111111', 'dsfdsf2x', null, '0', null, null);
INSERT INTO `tb_user` VALUES ('12', 'test1', '111111', 'aaa', null, '0', null, null);
INSERT INTO `tb_user` VALUES ('15', 'test4', '222222', 'somebody', null, '0', null, null);
INSERT INTO `tb_user` VALUES ('16', 'test5', '111111', 'dsfdsf', null, '0', null, null);
INSERT INTO `tb_user` VALUES ('17', 'test6', '111111', '1', null, '0', null, null);
INSERT INTO `tb_user` VALUES ('18', 'test7', '111111', 'dsfdsf', null, '0', null, null);