from django.db import models


class Cart(models.Model):
    cartnum = models.AutoField(db_column='CARTNUM', primary_key=True)  # Field name made lowercase.
    prodnum = models.ForeignKey('Product', models.DO_NOTHING, db_column='PRODNUM')  # Field name made lowercase.
    usernum = models.ForeignKey('User', models.DO_NOTHING, db_column='USERNUM')  # Field name made lowercase.
    cartcount = models.IntegerField(db_column='CARTCOUNT')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CART'
        unique_together = (('cartnum', 'prodnum'),)


class Category1(models.Model):
    category1 = models.AutoField(db_column='CATEGORY1', primary_key=True)  # Field name made lowercase.
    category1name = models.CharField(db_column='CATEGORY1NAME', max_length=20)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CATEGORY1'


class Category2(models.Model):
    category2 = models.AutoField(db_column='CATEGORY2', primary_key=True)  # Field name made lowercase.
    category1 = models.ForeignKey(Category1, models.DO_NOTHING, db_column='CATEGORY1', blank=True, null=True)  # Field name made lowercase.
    category2name = models.CharField(db_column='CATEGORY2NAME', max_length=20)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CATEGORY2'


class Doc(models.Model):
    docnum = models.AutoField(db_column='DOCNUM', primary_key=True)  # Field name made lowercase.
    reqnum = models.ForeignKey('Request', models.DO_NOTHING, db_column='REQNUM')  # Field name made lowercase.
    docwdate = models.DateField(db_column='DOCWDATE', auto_now_add=True)  # Field name made lowercase.
    docrdate = models.DateField(db_column='DOCRDATE', blank=True, null=True, auto_now=True)  # Field name made lowercase.
    docstate = models.CharField(db_column='DOCSTATE', max_length=20)  # Field name made lowercase.
    docrejectreason = models.CharField(db_column='DOCREJECTREASON', max_length=20, blank=True, null=True)  # Field name made lowercase.
    doccancled = models.IntegerField(db_column='DOCCANCLED', blank=True, null=True)  # Field name made lowercase.
    usernum = models.ForeignKey('User', models.DO_NOTHING, db_column='USERNUM')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'DOC'
        unique_together = (('docnum', 'reqnum'),)


class Order(models.Model):
    ordernum = models.AutoField(db_column='ORDERNUM', primary_key=True)  # Field name made lowercase.
    reqnum = models.ForeignKey('Request', models.DO_NOTHING, db_column='REQNUM')  # Field name made lowercase.
    orderdate = models.DateField(db_column='ORDERDATE', blank=True, null=True, auto_now_add=True)  # Field name made lowercase.
    orderstate = models.CharField(db_column='ORDERSTATE', max_length=20)  # Field name made lowercase.
    orderaddr = models.CharField(db_column='ORDERADDR', max_length=20, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ORDER'
        unique_together = (('ordernum', 'reqnum'),)


class Product(models.Model):
    prodnum = models.AutoField(db_column='PRODNUM', primary_key=True)  # Field name made lowercase.
    prodname = models.CharField(db_column='PRODNAME', max_length=20)  # Field name made lowercase.
    prodprice = models.IntegerField(db_column='PRODPRICE')  # Field name made lowercase.
    prodimg = models.CharField(db_column='PRODIMG', max_length=20)  # Field name made lowercase.
    category2 = models.ForeignKey(Category2, models.DO_NOTHING, db_column='CATEGORY2')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PRODUCT'


class Reqterm(models.Model):
    termyearmonth = models.IntegerField(db_column='TERMYEARMONTH', primary_key=True)  # Field name made lowercase.
    termstartdate = models.DateField(db_column='TERMSTARTDATE')  # Field name made lowercase.
    termenddate = models.DateField(db_column='TERMENDDATE')  # Field name made lowercase.
    termavailable = models.IntegerField(db_column='TERMAVAILABLE')  # Field name made lowercase.
    usernum = models.ForeignKey('User', models.DO_NOTHING, db_column='USERNUM', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'REQTERM'


class Request(models.Model):
    reqnum = models.AutoField(db_column='REQNUM', primary_key=True)  # Field name made lowercase.
    prodnum = models.ForeignKey(Product, models.DO_NOTHING, db_column='PRODNUM')  # Field name made lowercase.
    reqcount = models.IntegerField(db_column='REQCOUNT')  # Field name made lowercase.
    reqprice = models.IntegerField(db_column='REQPRICE')  # Field name made lowercase.
    reqdate = models.DateField(db_column='REQDATE', auto_now_add=True)  # Field name made lowercase.
    reqapvdate = models.DateField(db_column='REQAPVDATE', blank=True, null=True, auto_now=True)  # Field name made lowercase.
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
    usernum = models.AutoField(db_column='USERNUM', primary_key=True)  # Field name made lowercase.
    userid = models.CharField(db_column='USERID', unique=True, max_length=20)  # Field name made lowercase.
    userpwd = models.CharField(db_column='USERPWD', max_length=20)  # Field name made lowercase.
    username = models.CharField(db_column='USERNAME', max_length=20)  # Field name made lowercase.
    userathority = models.IntegerField(db_column='USERATHORITY')  # Field name made lowercase.
    userposition = models.CharField(db_column='USERPOSITION', max_length=20, blank=True, null=True)  # Field name made lowercase.
    userdept = models.CharField(db_column='USERDEPT', max_length=20, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'USER'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'
