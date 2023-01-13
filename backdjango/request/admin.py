from django.contrib import admin

from .models import User
from .models import Reqterm
from .models import Request


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['usernum', 'userid','username']


@admin.register(Reqterm)
class ReqtermAdmin(admin.ModelAdmin):
    list_display = ['termyearmonth', 'termstartdate','termenddate', 'termavailable']

@admin.register(Request)
class RequestAdmin(admin.ModelAdmin):
    list_display = ['reqnum', 'reqstaging','usernum','termyearmonth', 'prodnum']

