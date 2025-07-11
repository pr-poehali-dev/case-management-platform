import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [balance, setBalance] = useState(1250.5);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState("Player#1337");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [adminCases, setAdminCases] = useState([]);
  const [adminItems, setAdminItems] = useState([]);
  const [newCaseName, setNewCaseName] = useState("");
  const [newCasePrice, setNewCasePrice] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemRarity, setNewItemRarity] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");

  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "AK-47 | Cyberpunk",
      rarity: "legendary",
      price: 250.0,
      image: "/img/49d5fd17-c4a9-4bfe-904d-e43c21da6465.jpg",
    },
    {
      id: 2,
      name: "Knife | Neon Edge",
      rarity: "rare",
      price: 180.0,
      image: "/img/4f9bf786-9d6a-491e-8d46-82b79a4bb755.jpg",
    },
  ]);

  const [cases, setCases] = useState([
    {
      id: 1,
      name: "Cyber Case",
      price: 50.0,
      image: "/img/d102cfa5-57d6-4d5b-adcd-f3879c171fad.jpg",
      items: [
        {
          name: "AK-47 | Cyberpunk",
          image: "/img/49d5fd17-c4a9-4bfe-904d-e43c21da6465.jpg",
          rarity: "legendary",
          price: 250,
        },
        {
          name: "Knife | Neon Edge",
          image: "/img/4f9bf786-9d6a-491e-8d46-82b79a4bb755.jpg",
          rarity: "rare",
          price: 180,
        },
        {
          name: "Glock | Electric",
          image: "/img/49d5fd17-c4a9-4bfe-904d-e43c21da6465.jpg",
          rarity: "common",
          price: 45,
        },
      ],
      winChance: 15,
    },
    {
      id: 2,
      name: "Elite Case",
      price: 100.0,
      image: "/img/d102cfa5-57d6-4d5b-adcd-f3879c171fad.jpg",
      items: [
        {
          name: "AWP | Dragon Lore",
          image: "/img/49d5fd17-c4a9-4bfe-904d-e43c21da6465.jpg",
          rarity: "legendary",
          price: 800,
        },
        {
          name: "Karambit | Fade",
          image: "/img/4f9bf786-9d6a-491e-8d46-82b79a4bb755.jpg",
          rarity: "rare",
          price: 600,
        },
        {
          name: "M4A4 | Howl",
          image: "/img/49d5fd17-c4a9-4bfe-904d-e43c21da6465.jpg",
          rarity: "epic",
          price: 400,
        },
      ],
      winChance: 5,
    },
    {
      id: 3,
      name: "Starter Case",
      price: 25.0,
      image: "/img/d102cfa5-57d6-4d5b-adcd-f3879c171fad.jpg",
      items: [
        {
          name: "P90 | Asiimov",
          image: "/img/49d5fd17-c4a9-4bfe-904d-e43c21da6465.jpg",
          rarity: "rare",
          price: 80,
        },
        {
          name: "USP-S | Kill Confirmed",
          image: "/img/4f9bf786-9d6a-491e-8d46-82b79a4bb755.jpg",
          rarity: "common",
          price: 35,
        },
        {
          name: "Deagle | Blaze",
          image: "/img/49d5fd17-c4a9-4bfe-904d-e43c21da6465.jpg",
          rarity: "common",
          price: 30,
        },
      ],
      winChance: 25,
    },
  ]);

  const [selectedCase, setSelectedCase] = useState(null);
  const [openingCase, setOpeningCase] = useState(false);

  const openCase = (caseData) => {
    if (balance >= caseData.price) {
      setOpeningCase(true);
      setBalance(balance - caseData.price);

      setTimeout(() => {
        const randomItem =
          caseData.items[Math.floor(Math.random() * caseData.items.length)];
        const wonItem = {
          id: Date.now(),
          name: randomItem.name,
          rarity: randomItem.rarity,
          price: randomItem.price,
          image: randomItem.image,
        };
        setInventory([...inventory, wonItem]);
        setOpeningCase(false);
        toast({
          title: "🎉 Поздравляем!",
          description: `Вы получили ${wonItem.name} (${wonItem.price} ₽)`,
        });
      }, 3000);
    }
  };

  const sellItem = (itemId) => {
    const item = inventory.find((i) => i.id === itemId);
    if (item) {
      setBalance(balance + item.price);
      setInventory(inventory.filter((i) => i.id !== itemId));
      toast({
        title: "✅ Продано",
        description: `${item.name} продан за ${item.price} ₽`,
      });
    }
  };

  const depositMoney = (amount) => {
    if (amount > 0) {
      setBalance(balance + amount);
      toast({
        title: "💰 Пополнено",
        description: `Баланс пополнен на ${amount} ₽`,
      });
      setDepositAmount("");
    }
  };

  const withdrawMoney = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= balance) {
      setBalance(balance - amount);
      toast({
        title: "📤 Выведено",
        description: `${amount} ₽ отправлено на вывод`,
      });
      setWithdrawAmount("");
    }
  };

  const addNewCase = () => {
    if (newCaseName && newCasePrice) {
      const newCase = {
        id: Date.now(),
        name: newCaseName,
        price: parseFloat(newCasePrice),
        image: "/img/d102cfa5-57d6-4d5b-adcd-f3879c171fad.jpg",
        items: [],
        winChance: 10,
      };
      setCases([...cases, newCase]);
      setNewCaseName("");
      setNewCasePrice("");
      toast({
        title: "✅ Кейс создан",
        description: `Кейс "${newCase.name}" добавлен`,
      });
    }
  };

  const deleteCase = (caseId) => {
    setCases(cases.filter((c) => c.id !== caseId));
    toast({
      title: "🗑️ Кейс удален",
      description: "Кейс успешно удален",
    });
  };

  const login = () => {
    setIsLoggedIn(true);
    toast({
      title: "👋 Добро пожаловать",
      description: "Вы успешно вошли в аккаунт",
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    toast({
      title: "👋 До свидания",
      description: "Вы вышли из аккаунта",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background text-foreground font-inter flex items-center justify-center">
        <Card className="w-full max-w-md gradient-case border-primary/20">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon
                  name="Gamepad2"
                  size={24}
                  className="text-primary-foreground"
                />
              </div>
              <h1 className="text-2xl font-bold font-orbitron">CASE OPENING</h1>
              <p className="text-muted-foreground">Войдите в аккаунт</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Имя пользователя</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Введите имя"
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                />
              </div>
              <Button onClick={login} className="w-full gradient-primary">
                Войти
              </Button>
              <Button variant="outline" className="w-full">
                Зарегистрироваться
              </Button>
            </div>
          </div>
        </Card>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      <Toaster />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon
                  name="Gamepad2"
                  size={20}
                  className="text-primary-foreground"
                />
              </div>
              <h1 className="text-2xl font-bold font-orbitron">CASE OPENING</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-card rounded-lg px-4 py-2">
                <Icon name="Wallet" size={18} className="text-primary" />
                <span className="font-semibold">{balance.toFixed(2)} ₽</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Привет, {username}!
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выйти
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="cases" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-transparent border-b-0">
              <TabsTrigger
                value="cases"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon name="Package" size={16} className="mr-2" />
                Кейсы
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon name="Backpack" size={16} className="mr-2" />
                Инвентарь
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </TabsTrigger>
              <TabsTrigger
                value="deposit"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon name="CreditCard" size={16} className="mr-2" />
                Пополнение
              </TabsTrigger>
              <TabsTrigger
                value="withdraw"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon name="Banknote" size={16} className="mr-2" />
                Вывод
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon name="Settings" size={16} className="mr-2" />
                Админ
              </TabsTrigger>
            </TabsList>

            {/* Cases Tab */}
            <TabsContent value="cases" className="mt-8">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold font-orbitron mb-2">
                    Популярные кейсы
                  </h2>
                  <p className="text-muted-foreground">
                    Выберите кейс для открытия и получите редкие предметы
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cases.map((caseData) => (
                    <Card
                      key={caseData.id}
                      className="gradient-case border-primary/20 hover:border-primary/40 transition-all duration-300 hover:glow-effect"
                    >
                      <div className="p-6">
                        <div className="relative mb-4">
                          <img
                            src={caseData.image}
                            alt={caseData.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                            {caseData.winChance}% Win
                          </Badge>
                        </div>

                        <h3 className="text-xl font-bold font-orbitron mb-2">
                          {caseData.name}
                        </h3>

                        {/* Item Preview */}
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            Содержимое кейса:
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {caseData.items.slice(0, 3).map((item, index) => (
                              <div
                                key={index}
                                className="bg-card/50 p-2 rounded text-center"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-8 h-8 object-cover rounded mx-auto mb-1"
                                />
                                <p className="text-xs truncate">{item.name}</p>
                                <p className="text-xs text-primary">
                                  {item.price}₽
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon
                              name="Coins"
                              size={18}
                              className="text-primary"
                            />
                            <span className="text-2xl font-bold">
                              {caseData.price.toFixed(2)} ₽
                            </span>
                          </div>
                          <Button
                            onClick={() => openCase(caseData)}
                            disabled={balance < caseData.price || openingCase}
                            className="gradient-primary text-white font-semibold hover:scale-105 transition-transform"
                          >
                            Открыть
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {openingCase && (
                  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <Card className="p-8 text-center">
                      <div className="animate-pulse-slow mb-4">
                        <Icon
                          name="Package"
                          size={64}
                          className="text-primary mx-auto"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">
                        Открытие кейса...
                      </h3>
                      <Progress value={66} className="w-64 mx-auto" />
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory" className="mt-8">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold font-orbitron mb-2">
                    Мой инвентарь
                  </h2>
                  <p className="text-muted-foreground">
                    Ваши предметы • Общая стоимость:{" "}
                    {inventory
                      .reduce((sum, item) => sum + item.price, 0)
                      .toFixed(2)}{" "}
                    ₽
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {inventory.map((item) => (
                    <Card
                      key={item.id}
                      className="gradient-case border-primary/20 hover:border-primary/40 transition-all duration-300"
                    >
                      <div className="p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-bold mb-1">{item.name}</h4>
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {item.rarity}
                          </Badge>
                          <span className="text-primary font-bold">
                            {item.price.toFixed(2)} ₽
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => sellItem(item.id)}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          Продать
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-8">
              <div className="container mx-auto px-4 max-w-2xl">
                <Card className="gradient-case border-primary/20">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold font-orbitron mb-6">
                      Профиль игрока
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                          <Icon
                            name="User"
                            size={32}
                            className="text-primary-foreground"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{username}</h3>
                          <p className="text-muted-foreground">Уровень: 15</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-card rounded-lg">
                          <p className="text-2xl font-bold text-primary">47</p>
                          <p className="text-sm text-muted-foreground">
                            Кейсов открыто
                          </p>
                        </div>
                        <div className="text-center p-4 bg-card rounded-lg">
                          <p className="text-2xl font-bold text-primary">
                            ₽2,450
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Потрачено
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Icon
                            name="Gift"
                            size={16}
                            className="text-primary"
                          />
                          <span>Реферальный код: PLAYER1337</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon
                            name="Users"
                            size={16}
                            className="text-primary"
                          />
                          <span>Рефералов: 3</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Deposit Tab */}
            <TabsContent value="deposit" className="mt-8">
              <div className="container mx-auto px-4 max-w-2xl">
                <Card className="gradient-case border-primary/20">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold font-orbitron mb-6">
                      Пополнение баланса
                    </h2>

                    <div className="space-y-4">
                      <div className="bg-card p-4 rounded-lg">
                        <Label htmlFor="deposit-amount">Сумма пополнения</Label>
                        <div className="flex space-x-2 mt-2">
                          <Input
                            id="deposit-amount"
                            type="number"
                            placeholder="0.00"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                          />
                          <Button
                            onClick={() =>
                              depositMoney(parseFloat(depositAmount))
                            }
                          >
                            Пополнить
                          </Button>
                        </div>
                      </div>

                      <div className="bg-card p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Быстрые суммы</h3>
                        <div className="grid grid-cols-4 gap-2">
                          {[100, 500, 1000, 2500].map((amount) => (
                            <Button
                              key={amount}
                              variant="outline"
                              size="sm"
                              onClick={() => depositMoney(amount)}
                            >
                              {amount} ₽
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button className="h-16 bg-yellow-600 hover:bg-yellow-700">
                          <Icon name="Banknote" size={24} className="mr-2" />
                          ЮKassa
                        </Button>
                        <Button className="h-16 bg-orange-600 hover:bg-orange-700">
                          <Icon name="Gamepad2" size={24} className="mr-2" />
                          Steam Items
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Withdraw Tab */}
            <TabsContent value="withdraw" className="mt-8">
              <div className="container mx-auto px-4 max-w-2xl">
                <Card className="gradient-case border-primary/20">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold font-orbitron mb-6">
                      Вывод средств
                    </h2>

                    <div className="space-y-4">
                      <div className="bg-card p-4 rounded-lg">
                        <p className="text-center text-muted-foreground">
                          Доступно для вывода:{" "}
                          <span className="text-primary font-bold">
                            {balance.toFixed(2)} ₽
                          </span>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="withdraw-amount">Сумма к выводу</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="withdraw-amount"
                            type="number"
                            placeholder="0.00"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                          />
                          <Button onClick={withdrawMoney}>Вывести</Button>
                        </div>
                      </div>

                      <div className="bg-card p-4 rounded-lg">
                        <Label htmlFor="withdraw-details">
                          Реквизиты для вывода
                        </Label>
                        <Input
                          id="withdraw-details"
                          type="text"
                          placeholder="Номер карты или кошелька"
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Admin Tab */}
            <TabsContent value="admin" className="mt-8">
              <div className="container mx-auto px-4">
                <Card className="gradient-case border-primary/20">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold font-orbitron mb-6">
                      Админ-панель
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Add New Case */}
                      <Card className="p-4 bg-card">
                        <h3 className="font-bold mb-4">Добавить кейс</h3>
                        <div className="space-y-3">
                          <Input
                            placeholder="Название кейса"
                            value={newCaseName}
                            onChange={(e) => setNewCaseName(e.target.value)}
                          />
                          <Input
                            type="number"
                            placeholder="Цена кейса"
                            value={newCasePrice}
                            onChange={(e) => setNewCasePrice(e.target.value)}
                          />
                          <Button onClick={addNewCase} className="w-full">
                            <Icon name="Plus" size={16} className="mr-2" />
                            Создать кейс
                          </Button>
                        </div>
                      </Card>

                      {/* Statistics */}
                      <Card className="p-4 bg-card">
                        <h3 className="font-bold mb-4">Статистика</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Всего кейсов:</span>
                            <span className="font-bold">{cases.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Активных пользователей:</span>
                            <span className="font-bold">247</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Доход за день:</span>
                            <span className="font-bold text-green-500">
                              ₽15,420
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Cases Management */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">
                        Управление кейсами
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cases.map((caseData) => (
                          <Card key={caseData.id} className="p-4 bg-card">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold">{caseData.name}</h4>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteCase(caseData.id)}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Цена: {caseData.price} ₽
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Предметов: {caseData.items.length}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Шанс выигрыша: {caseData.winChance}%
                            </p>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Additional Admin Functions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="h-16">
                            <Icon name="Percent" size={24} className="mr-2" />
                            Настройка шансов
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Настройка шансов выпадения
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Редкость Common (60%)</Label>
                              <Input type="number" placeholder="60" />
                            </div>
                            <div>
                              <Label>Редкость Rare (25%)</Label>
                              <Input type="number" placeholder="25" />
                            </div>
                            <div>
                              <Label>Редкость Legendary (15%)</Label>
                              <Input type="number" placeholder="15" />
                            </div>
                            <Button className="w-full">Сохранить</Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button className="h-16">
                        <Icon name="Users" size={24} className="mr-2" />
                        Пользователи
                      </Button>

                      <Button className="h-16">
                        <Icon name="BarChart" size={24} className="mr-2" />
                        Аналитика
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </nav>
    </div>
  );
};

export default Index;
