import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [balance, setBalance] = useState(1250.5);
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

  const cases = [
    {
      id: 1,
      name: "Cyber Case",
      price: 50.0,
      image: "/img/d102cfa5-57d6-4d5b-adcd-f3879c171fad.jpg",
      items: ["AK-47 | Cyberpunk", "Knife | Neon Edge", "Glock | Electric"],
      winChance: 15,
    },
    {
      id: 2,
      name: "Elite Case",
      price: 100.0,
      image: "/img/d102cfa5-57d6-4d5b-adcd-f3879c171fad.jpg",
      items: ["AWP | Dragon Lore", "Karambit | Fade", "M4A4 | Howl"],
      winChance: 5,
    },
    {
      id: 3,
      name: "Starter Case",
      price: 25.0,
      image: "/img/d102cfa5-57d6-4d5b-adcd-f3879c171fad.jpg",
      items: ["P90 | Asiimov", "USP-S | Kill Confirmed", "Deagle | Blaze"],
      winChance: 25,
    },
  ];

  const [selectedCase, setSelectedCase] = useState(null);
  const [openingCase, setOpeningCase] = useState(false);

  const openCase = (caseData) => {
    if (balance >= caseData.price) {
      setOpeningCase(true);
      setBalance(balance - caseData.price);

      setTimeout(() => {
        const wonItem = {
          id: Date.now(),
          name: caseData.items[
            Math.floor(Math.random() * caseData.items.length)
          ],
          rarity: "common",
          price: caseData.price * 0.8,
          image: "/img/49d5fd17-c4a9-4bfe-904d-e43c21da6465.jpg",
        };
        setInventory([...inventory, wonItem]);
        setOpeningCase(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
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
              <Button className="gradient-primary text-white font-semibold glow-effect">
                <Icon name="Plus" size={16} className="mr-2" />
                Пополнить
              </Button>
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
                        <p className="text-muted-foreground mb-4">
                          Содержит: {caseData.items.slice(0, 2).join(", ")}...
                        </p>

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
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {item.rarity}
                          </Badge>
                          <span className="text-primary font-bold">
                            {item.price.toFixed(2)} ₽
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full mt-3 bg-green-600 hover:bg-green-700"
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
                          <h3 className="text-xl font-bold">Player#1337</h3>
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

                      <div className="bg-card p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Быстрые суммы</h3>
                        <div className="grid grid-cols-4 gap-2">
                          {[100, 500, 1000, 2500].map((amount) => (
                            <Button key={amount} variant="outline" size="sm">
                              {amount} ₽
                            </Button>
                          ))}
                        </div>
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
                        <label className="text-sm font-medium">
                          Сумма к выводу
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="number"
                            placeholder="0.00"
                            className="flex-1 px-3 py-2 bg-card border border-border rounded-lg"
                          />
                          <Button>Вывести</Button>
                        </div>
                      </div>

                      <div className="bg-card p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Реквизиты для вывода</h3>
                        <input
                          type="text"
                          placeholder="Номер карты или кошелька"
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card className="p-4 bg-card">
                        <h3 className="font-bold mb-2">Управление кейсами</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Создание, редактирование и удаление кейсов
                        </p>
                        <Button size="sm" className="w-full">
                          <Icon name="Package" size={16} className="mr-2" />
                          Кейсы
                        </Button>
                      </Card>

                      <Card className="p-4 bg-card">
                        <h3 className="font-bold mb-2">
                          Управление предметами
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Добавление предметов и настройка редкости
                        </p>
                        <Button size="sm" className="w-full">
                          <Icon name="Sword" size={16} className="mr-2" />
                          Предметы
                        </Button>
                      </Card>

                      <Card className="p-4 bg-card">
                        <h3 className="font-bold mb-2">Настройка шансов</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Управление процентами выпадения
                        </p>
                        <Button size="sm" className="w-full">
                          <Icon name="Percent" size={16} className="mr-2" />
                          Шансы
                        </Button>
                      </Card>

                      <Card className="p-4 bg-card">
                        <h3 className="font-bold mb-2">Статистика</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Аналитика и отчеты
                        </p>
                        <Button size="sm" className="w-full">
                          <Icon name="BarChart" size={16} className="mr-2" />
                          Статистика
                        </Button>
                      </Card>

                      <Card className="p-4 bg-card">
                        <h3 className="font-bold mb-2">Пользователи</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Управление аккаунтами
                        </p>
                        <Button size="sm" className="w-full">
                          <Icon name="Users" size={16} className="mr-2" />
                          Пользователи
                        </Button>
                      </Card>

                      <Card className="p-4 bg-card">
                        <h3 className="font-bold mb-2">Настройки</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Общие настройки сайта
                        </p>
                        <Button size="sm" className="w-full">
                          <Icon name="Settings" size={16} className="mr-2" />
                          Настройки
                        </Button>
                      </Card>
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
