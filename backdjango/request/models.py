# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Cart(models.Model):
    cartnum = models.CharField(db_column='CARTNUM', primary_key=True, max_length=20)  # Field name made lowercase.
    prodnum = models.ForeignKey('Product', models.DO_NOTHING, db_column='PRODNUM')  # Field name made lowercase.
    usernum = models.ForeignKey('User', models.DO_NOTHING, db_column='USERNUM')  # Field name made lowercase.
    cartcount = models.IntegerField(db_column='CARTCOUNT')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CART'
        unique_together = (('cartnum', 'prodnum'),)


class Category1(models.Model):
    category1 = models.CharField(db_column='CATEGORY1', primary_key=True, max_length=20)  # Field name made lowercase.
    category1name = models.CharField(db_column='CATEGORY1NAME', max_length=20)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CATEGORY1'


class Category2(models.Model):
    category2 = models.CharField(db_column='CATEGORY2', primary_key=True, max_length=20)  # Field name made lowercase.
    category1 = models.ForeignKey(Category1, models.DO_NOTHING, db_column='CATEGORY1')  # Field name made lowercase.
    category2name = models.CharField(db_column='CATEGORY2NAME', max_length=20)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CATEGORY2'


class Doc(models.Model):
    docnum = models.CharField(db_column='DOCNUM', primary_key=True, max_length=20)  # Field name made lowercase.
    reqnum = models.ForeignKey('Request', models.DO_NOTHING, db_column='REQNUM')  # Field name made lowercase.
    docwdate = models.DateField(db_column='DOCWDATE')  # Field name made lowercase.
    docrdate = models.DateField(db_column='DOCRDATE', blank=True, null=True)  # Field name made lowercase.
    docstate = models.CharField(db_column='DOCSTATE', max_length=20)  # Field name made lowercase.
    docrejectreason = models.CharField(db_column='DOCREJECTREASON', max_length=20, blank=True, null=True)  # Field name made lowercase.
    doccancled = models.IntegerField(db_column='DOCCANCLED', blank=True, null=True)  # Field name made lowercase.
    usernum = models.ForeignKey('User', models.DO_NOTHING, db_column='USERNUM')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'DOC'
        unique_together = (('docnum', 'reqnum'),)


class Order(models.Model):
    ordernum = models.CharField(db_column='ORDERNUM', primary_key=True, max_length=20)  # Field name made lowercase.
    reqnum = models.ForeignKey('Request', models.DO_NOTHING, db_column='REQNUM')  # Field name made lowercase.
    orderdate = models.DateField(db_column='ORDERDATE', blank=True, null=True)  # Field name made lowercase.
    orderstate = models.CharField(db_column='ORDERSTATE', max_length=20)  # Field name made lowercase.
    orderaddr = models.CharField(db_column='ORDERADDR', max_length=20, blank=True, null=True)  # Field name made lowercase.
    termyearmonth = models.ForeignKey('Reqterm', models.DO_NOTHING, db_column='TERMYEARMONTH', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ORDER'
        unique_together = (('ordernum', 'reqnum'),)


class Product(models.Model):
    prodnum = models.CharField(db_column='PRODNUM', primary_key=True, max_length=20)  # Field name made lowercase.
    prodname = models.CharField(db_column='PRODNAME', max_length=20)  # Field name made lowercase.
    prodprice = models.IntegerField(db_column='PRODPRICE')  # Field name made lowercase.
    prodimg = models.CharField(db_column='PRODIMG', max_length=20)  # Field name made lowercase.
    category1 = models.ForeignKey(Category1, models.DO_NOTHING, db_column='CATEGORY1')  # Field name made lowercase.
    category2 = models.ForeignKey(Category2, models.DO_NOTHING, db_column='CATEGORY2')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PRODUCT'


class Reqterm(models.Model):
    termyearmonth = models.CharField(db_column='TERMYEARMONTH', primary_key=True, max_length=20)  # Field name made lowercase.
    termstartdate = models.DateField(db_column='TERMSTARTDATE')  # Field name made lowercase.
    termenddate = models.DateField(db_column='TERMENDDATE')  # Field name made lowercase.
    termavailable = models.IntegerField(db_column='TERMAVAILABLE')  # Field name made lowercase.
    usernum = models.ForeignKey('User', models.DO_NOTHING, db_column='USERNUM', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'REQTERM'


class Request(models.Model):
    reqnum = models.CharField(db_column='REQNUM', primary_key=True, max_length=20)  # Field name made lowercase.
    prodnum = models.ForeignKey(Product, models.DO_NOTHING, db_column='PRODNUM')  # Field name made lowercase.
    reqcount = models.IntegerField(db_column='REQCOUNT')  # Field name made lowercase.
    reqprice = models.IntegerField(db_column='REQPRICE')  # Field name made lowercase.
    reqdate = models.DateField(db_column='REQDATE')  # Field name made lowercase.
    reqapvdate = models.DateField(db_column='REQAPVDATE', blank=True, null=True)  # Field name made lowercase.
    reqstate = models.CharField(db_column='REQSTATE', max_length=20)  # Field name made lowercase.
    reqstaging = models.CharField(db_column='REQSTAGING', max_length=20, blank=True, null=True)  # Field name made lowercase.
    reqrejectreason = models.CharField(db_column='REQREJECTREASON', max_length=20, blank=True, null=True)  # Field name made lowercase.
    reqcancled = models.IntegerField(db_column='REQCANCLED')  # Field name made lowercase.
    usernum = models.ForeignKey('User', models.DO_NOTHING, db_column='USERNUM')  # Field name made lowercase.
    termyearmonth = models.ForeignKey(Reqterm, models.DO_NOTHING, db_column='TERMYEARMONTH')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'REQUEST'


class User(models.Model):
    usernum = models.CharField(db_column='USERNUM', primary_key=True, max_length=20)  # Field name made lowercase.
    userid = models.CharField(db_column='USERID', max_length=20)  # Field name made lowercase.
    userpwd = models.CharField(db_column='USERPWD', max_length=20)  # Field name made lowercase.
    username = models.CharField(db_column='USERNAME', max_length=20)  # Field name made lowercase.
    userathority = models.IntegerField(db_column='USERATHORITY')  # Field name made lowercase.
    userposition = models.CharField(db_column='USERPOSITION', max_length=20, blank=True, null=True)  # Field name made lowercase.
    userdept = models.CharField(db_column='USERDEPT', max_length=20, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'USER'
